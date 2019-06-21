# Title "ADR 1: Introduction of Redux"

## Context: 

 After working with the backend some and developing the parser methods to accomplish our MVP it was discussed amongst the group the need for a global state management system as there
 would be multiple areas in the application that would benefit from it. We considered attempting to utilize the Context API or Redux as passing global props through react natives
 navigation components was not a feasible option. 

## Decision

  As the entirety of the team is familiar with Redux and this was not the case with the Context Api, we have decided to implement Redux into the project

## Status

  Accepted.

## Consequences

  As the application having global state is a project wide alteration, the group mob programmed during the addition of it so all would be familiar with the new flow of the
  application. With the global state in place, we can now connect any part of it to any component via the connect HOC, making handling state and props much easier.