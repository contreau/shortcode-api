<script setup lang="ts">
import { ref } from "vue";
import type { PostResponse } from "../types.ts";
import { postURL } from "../actions/post.ts";
const props = defineProps<{
    title: string;
    method: string;
    placeholder: string;
}>();
const invalidUrlErrorVisible = ref(false);

function isValidURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

function validateInput(event: Event, url: string) {
    if (!isValidURL(url)) {
        event.preventDefault();
        invalidUrlErrorVisible.value = true;
        setTimeout(() => {
            invalidUrlErrorVisible.value = false;
        }, 3000);
    }
    inputValue.value = "";
}

const inputValue = ref("");

const statusMap = new Map<number, string>([
    [200, "success"],
    [201, "success"],
    [204, "success"],
    [400, "error"],
    [404, "error"],
]);

// UI display state
const statusSuccess = ref(false);
const responseContents = ref<PostResponse>();

async function POST_shortcode(event: Event) {
    event?.preventDefault();
    let [data, status, message] = await postURL("/shorten", inputValue.value);
    console.log(data);
    POST.responseContainer.classList.remove("visible");

    if (statusMap.get(status) === "error") {
        statusSuccess.value = false;

        POST.statusLabel.textContent = `${status}`;
        POST.statusMessage.textContent = /** @type {string} */ message;
        POST.statusMessage.classList.remove("hide");
        POST.statusResponse.classList.add("visible");
    } else {
        data = data as PostResponse;
        for (let i = 0; i < Object.keys(data).length; i++) {
            POST.responseItemSpans[i].textContent =
                /** @type {string} */ data[`${POST.responseItemSpans[i].id}`];
        }
        POST.statusLabel.classList.add(
            /** @type {string} */ statusMap.get(status),
        );
        POST.statusLabel.textContent = `${status}`;
        POST.statusMessage.textContent = /** @type {string} */ message;
        POST.statusResponse.classList.add("visible");
        POST.responseContainer.classList.add("visible");
    }

    inputValue.value = "";
}
</script>

<template>
    <h2>{{ props.title }}</h2>
    <form :method>
        <input
            v-model="inputValue"
            @submit="POST_shortcode($event)"
            type="text"
            name="url"
            :placeholder
        />
        <input
            @click="validateInput($event, inputValue)"
            type="submit"
            value="Submit"
        />
    </form>
    <p class="invalid-url-message" :class="{ visible: invalidUrlErrorVisible }">
        Invalid URL.
    </p>

    <code class="response-status">
        <p>
            Status:
            <span
                class="status-code"
                :class="[statusSuccess ? 'success' : 'error']"
            ></span>
        </p>
        <p class="status-message hide"></p>
    </code>
    <div class="response-contents">
        <code>
            { <br />
            &nbsp;&nbsp;id:
            <span class="response-item" id="id">{{ responseContents.id }}</span>
            <br />
            &nbsp;&nbsp;url:
            <span class="response-item" id="url">{{
                responseContents.url
            }}</span>
            <br />
            &nbsp;&nbsp;shortcode:
            <span class="response-item" id="shortcode">{{
                responseContents.shortcode
            }}</span>
            <br />
            &nbsp;&nbsp;createdAt:
            <span class="response-item" id="createdAt">{{
                responseContents.createdAt
            }}</span>
            <br />
            &nbsp;&nbsp;updatedAt:
            <span class="response-item" id="updatedAt">{{
                responseContents.updatedAt
            }}</span>
            <br />
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
