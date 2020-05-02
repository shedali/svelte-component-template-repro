import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {render} from "@testing-library/svelte";
import Component from "./components/Component.svelte";

test("shows proper heading when rendered", () => {
  const {getByText} = render(Component, {name: "World"});
  expect(getByText("World")).toBeInTheDocument();
});

test.todo('should do something else')
