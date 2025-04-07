<script setup lang="ts">
import { UI_state } from "./store";
import type { DatabaseResponse } from "../types.ts";
import { validateUrlInput } from "../helpers.ts";
import { postURL } from "../actions/post.ts";
import { getURL } from "../actions/get.ts";

const props = defineProps<{
    title: string;
    method: string;
    placeholder: string;
    action: string;
}>();

const statusMap = new Map<number, string>([
    [200, "success"],
    [201, "success"],
    [204, "success"],
    [400, "error"],
    [404, "error"],
]);

// * TODO: continue rework this function to be a general wrapper for all HTTP verb actions, since they all
// return the same object; use the method prop to map to the appropriate imported function
// UI rendering shouldn't have to be changed
// * Consider: action functions could also just be one function with optional parameters

async function callDatabase(event: Event, method: string, action: string) {
    const methodToFunction: Record<string, Function> = {
        post: postURL,
        get: getURL,
    };
    event.preventDefault();
    let [data, status, message] = await methodToFunction[method](
        UI_state.inputValue,
        action,
    );
    console.log(data);
    UI_state.responseMessage = message;
    UI_state.statusCode = status;
    if (statusMap.get(status) === "error") {
        UI_state.statusSuccess = false;
    } else {
        UI_state.responseContents = data as DatabaseResponse;
        UI_state.statusSuccess = true;
    }
    UI_state.statusVisible = true;

    UI_state.inputValue = "";
}
</script>

<template>
    <h2>{{ props.title }}</h2>
    <form @submit="callDatabase($event, props.method, props.action)" :method>
        <input
            v-model="UI_state.inputValue"
            type="text"
            name="url"
            :placeholder
        />
        <input
            @click="validateUrlInput($event, props.method, UI_state.inputValue)"
            type="submit"
            value="Submit"
        />
    </form>
    <p
        class="invalid-url-message"
        :class="{ visible: UI_state.invalidUrlErrorVisible }"
    >
        Invalid URL.
    </p>

    <code class="response-status" :class="{ visible: UI_state.statusVisible }">
        <p>
            Status:
            <span
                class="status-code"
                :class="[UI_state.statusSuccess ? 'success' : 'error']"
                >{{ UI_state.statusCode }}</span
            >
        </p>
        <p class="status-message">{{ UI_state.responseMessage }}</p>
    </code>
    <div class="response-contents" :class="{ visible: UI_state.statusSuccess }">
        <code>
            { <br />
            <div v-for="(value, key) of UI_state.responseContents">
                &nbsp;&nbsp;{{ key }}:
                <span class="response-item">{{ value }} </span>
                <br />
            </div>
            }
        </code>
    </div>
</template>

<style scoped>
h2 {
    font-size: 1.7rem;
}

input[type="text"] {
    min-width: 300px;
    font-size: 1.1rem;
    padding: 0.3em 0.5em;
    border-radius: 10px;
    border: transparent;
}

input[type="submit"] {
    font-size: 1.1rem;
    font-weight: 500;
    padding: 0.3em 0.5em;
    margin-left: 0.5rem;
    border-radius: 10px;
    border: transparent;
    color: #000000;
    background-color: var(--green);
    cursor: pointer;
}

.hide {
    display: none;
}

.invalid-url-message {
    opacity: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--red);
    transition: opacity 0.2s;
    padding-left: 0.25em;
}

.response-contents {
    opacity: 0;
    transition: opacity 0.2s;
}

code {
    font-size: 1.25rem;
}

span.response-item {
    color: var(--green);
}

code.response-status {
    opacity: 0;
    transition: opacity 0.2s;

    &.visible {
        opacity: 1;
    }
}

span.status-code {
    padding: 0.2em 0.4em;
    color: #000000;
    font-weight: 600;
    border-radius: 10px;

    &.error {
        background-color: var(--red);
    }

    &.success {
        background-color: var(--green);
    }
}

.visible {
    opacity: 1;
}
</style>
