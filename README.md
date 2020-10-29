# Frontier React Exercise

At Frontier, we aim to help our customers find and hire more candidates by improving their entire hiring funnel. One large part of this funnel is our highly optimized job application forms, which we often generate from our customer's existing application form.

![An example of a Frontier application form](https://frontier-public-assets.s3-us-west-2.amazonaws.com/frontier-form-demo.png)

When we generate our application forms, the first step involves capturing the customer's original form and generating a detailed schematic to describe the form to our React form generator on the frontend.

## About the exercise
The JSON array in `./src/data/form_instructions.json` is an example of the instructions used by our React app to generate application forms on the fly for our customers. 

For this short exercise, please use the basic React setup provided in this repo, along with the provided instruction JSON, to generate a functional application form UI. We want you to solve the problem in a way that makes sense to you, but we ask that you consider the following constraints:

- Please use Typescript to the best of your ability.
- In your finished implementation, the "Submit" button should log the user entered values to the console.
- Style the UI yourself by any means you feel comfortable (ie. styled-components, SCSS, LESS, vanilla CSS). Try to avoid using third party UI libraries like material-ui and bootstrap. We're mainly looking for consistency in styling, so you don't need to spend a lot of time making everything look perfect.
- Try to structure your code so it can be unit tested. Bonus points if you also write a unit test for one of your components.

When you send your solution please include your thoughts on the exercise, and how long you spent on it so we can adjust our expectations.

Good luck!

– Frontier Engineering :)
