# Scalable Classroom Code Review Tool

## CS 242 Final Project
Brandon Chong and Porter Smith

## Project Purpose
The goal of this project is to design a general purpose code review tool that can ideally be used for programming courses. We want to facilitate code quality in intro computer science courses.

## Background/Motivation
We have both been on course staff for programming courses for a number of semesters and feel that the code quality of intro programming assignments is not where it should be. Software engineering principles apply to any part of industry a programmer works in and feel that code quality should be constantly worked on throughout an undergraduate's time at the university. While tools exist to facilitate code reviews, these require enough manual intervention from staff that they don’t scale to a class of 400 students.

## Features
Every user should simultaneously be a reviewer and reviewee for multiple submissions. Each submission is a single iteration of an assignment and both the reviewer and reviewee should be able to see the assignment with syntax highlighting. From there both the reviewer and reviewee should be able to add annotations and have a conversation going. Once a reviewer is done reviewing an assignment they should be able to either ask for additional changes or approve the assignment. In both cases a report should be generated for the reviewee to receive feedback. If the reviewer asked for additional changes then the reviewer needs to followup with another iteration.
