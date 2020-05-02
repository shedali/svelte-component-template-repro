import {action} from "@storybook/addon-actions";

import App from "./components/Component.svelte";

export default {
    title: "App"
};

export const BasicComponent = () => ({
    Component: App,
    props: {name: "Franz Sittampalam"},
    on: {click: action("clicked")}
});

