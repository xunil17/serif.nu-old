<a href="https://serif.nu/">
    <img src="app/images/SerifLogo.png" alt="Serif.nu Logo" align="right" width="100" />
</a>

# Serif.nu
#### Simple. Fast. Visual. Course Planning for Northwestern University.

## Current Status
The new Serif.nu was released on Feb. 6th 2017 and currently resides at https://serif.nu.

This repository is a complete rebuild of the [previous application, Serif](https://github.com/Joonpark13/nuvsc).

## About
Serif.nu is a course scheduler for Northwestern University, designed to make your registration week easy and painless. No more drawing it out on paper, no more clunky spreadsheets. Draft up a dream schedule (or four) before you register.

Serif.nu is built with [React](https://facebook.github.io/react/), [React Router](https://github.com/ReactTraining/react-router), and [Redux](https://github.com/reactjs/redux), compiled with [webpack](https://webpack.github.io/), and run on [Node.js](https://nodejs.org/en/) with [express](http://expressjs.com/). It also utilizes [Immutable.js](https://facebook.github.io/immutable-js/), [FullCalendar](https://fullcalendar.io/) with the [material design theme](https://github.com/jackyliang/Material-Design-For-Full-Calendar), and [Material UI](http://www.material-ui.com/#/).

## Install
	git clone https://github.com/Joonpark13/serif.nu.git
	npm install

## Bulding and Running Locally
For development, run:

	npm run dev
	
For a production build, run

	npm run build
	npm start
	
## Data
The data is stored in static json files under `app/data`. Conceptually, there are 5 different hierarchical levels (from highest to lowest): terms, schools, subjects, courses, and sections. They are described in more detail below. Strucurally, they are stored as such:

	data/
	+-- terms.json
	+-- 4650/
		+-- schools.json
		+-- subjects.json
		+-- courses.json
		+-- sections.json
	+-- 4640/
		+-- schools.json
		+-- subjects.json
		+-- courses.json
		+-- sections.json
	+-- 4630/
		+-- schools.json
		+-- subjects.json
		+-- courses.json
		+-- sections.json
	+-- etc...

There is a `terms.json` file containing a list of objects describing each of the
terms at the root of the data directory. The directory also contains a
subdirectory for each of the terms, which in turn contain `schools.json`,
`subjects.json`, `courses.json`, and `sections.json` files that hold all of the
relevant data for each level.

### Terms
`terms.json` contains an array of term objects. Each term object is formatted as such:

	{
		"term": "Fall 2016",
		"acadyear": "2016-2017",
		"id": "4640",
		"start": "2016-09-20",
		"end": "2016-12-03"
	}

and represents an academic term, also known as a 'quarter'. The unique identifier of a term object is its `id`.

### Schools
Each `schools.json` file contains an array of all school objects for the term
under which this file is nested. Each school object is formatted as such:

	{
		"id": "MUSIC",
		"name": "Bienen School of Music"
	}

and represents a school within the university. The unique identifier of a school
object is its `id`. However, a school object is unique only within its
corresponding term (Ex: both term 4650 and 4640 have a school object with the
`id` of `WCAS`).

### Subjects
Each `subjects.json` file contains an array of all subject objects for the term
under which this file is nested. Each subject object is formatted as such:

	{
		"abbv": "HISTORY",
		"school": "WCAS",
		"name": "History"
	}
	
and represents a subject, also distinguished as separate departments. The unique identifier of a subject object is its `abbv`. A subject object is unique only within its corresponding school.

### Courses
Each `courses.json` file contains an array of all course objects for the term
under which this file is nested. Each course object is formatted as such:

	{
		"abbv": "200-0",
		"school": "WCAS",
		"subject": "HISTORY",
		"name": "New Introductory Courses in History"
	}
	
and represents a course. The unique identifier of a course is its `abbv`. A course object is unique only within its corresponding subject.

### Sections
Each `sections.json` file contains an array of all section objects for the term
under which this file is nested. Each section object is formatted as such:

	{
		"school": "WCAS",
		"overview_of_class": "In this course we will explore the life and times of Alexander Hamilton...",
		"name": "New Introductory Courses in History",
		"section": "1",
		"location": "Leverone Auditorium Owen Coon",
		"topic": "Hamilton's America",
		"course": "200-0",
		"meeting_time": [
			"MoWeFr 2:00PM - 2:50PM"
		],
		"instructor": [
			"Geraldo L Cadava",
			"Caitlin Annette Fitz"
		],
		"class_attributes": "Historical Studies Distro Area",
		"id": "25651",
		"subject": "HISTORY"
	}
	
and represents a section. A section is the most accurate representation of what students conceptualize as "a class". When a student registers for a class on CAESAR, they are signing up for a section. These are also the objects that become added to the calendar on Serif.nu. The unique identifier of a section is its `id`. A section object is unique only within its corresponding course.

## State Store
Serif.nu's state is managed by [Redux](https://github.com/reactjs/redux). Redux is a Flux implementation that is often used together with React, with its core principle being that the entire state of the application is stored inside an object tree called the store. By only allowing the modification of state through *actions*, the state of the application becomes much easier to handle. The actions are fed to a *reducer*, which is just a pure function of the action and state. Since redux forbids modification of state objects and instead requires the return of a new copy of the object for every action, we use a combination of [jquery's `extend`](https://api.jquery.com/jquery.extend/) with the deep parameter set to true and [Immutable.js](https://facebook.github.io/immutable-js/). Immutable.js is implemented currently only for the `calendar` and the `snackbar` portions of the state, and the rest use jquery's `extend`, or in many cases, simply manualy return a new object. Since the reducer is split (see `app/reducers`), this is not difficult to manage on many occasions.

The complete store is composed as such:

	{
		browse:
			A nested object containing state that governs the Browse tab.
			See `app/reducers/browse.js` for more info.
		search:
			A nested object containing state that governs the Search tab.
			See `app/reducers/search.js` for more info.
		calendar:
			An Immutable.js nested Map object, see `app/reducers/calendar.js`
			for more info. This state is saved to localStorage.
		cart:
			A nested object containing state that governs the Cart tab.
			See `app/reducers/cart.js` for more info.
		selectingComponent: bool, default: false.
			Indicates whether the user is currently in the process of
			selecing a component.
		tabState: string, default: 'search'
			Can be one of three options: 'search', 'browse', or 'cart'.
			Indicates the currently viewed tab.
		firstVisit: bool, default: false
			Indicates whether this is the user's first visit to the site.
			This state is saved to localStorage.
		terms:
			A nested object containing the current term id, as well as
			the data for the current term. See `app/reducers/term.js` for
			more info.
		snackbar: {
			open: bool, default: false
				Represents the state of the notification snackbar that
				appears on the bottom of the screen after relevant actions
				are triggered by the user.
			message: string, default: ''
				Contains the message displayed to the user inside the
				snackbar.
		}
	}
	
### localStorage
Serif.nu is able to maintain user schedules even if the user closes and re-opens the website. This is because the `calendar` section of the state is stored in the browser's localStorage using [redux-localstorage](https://github.com/elgerlambert/redux-localstorage). See the implementation in `app/store.js`.