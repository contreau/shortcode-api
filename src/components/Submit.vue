<script setup lang="ts">
import { ref } from "vue";
import type { PostResponse } from "../types.ts";
import { postURL } from "../actions/post.ts";
const props = defineProps<{
    title: string;
    method: string;
    placeholder: string;
}>();

function validateInput(event: Event, url: string) {
    const isValidURL = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };
    if (!isValidURL(url)) {
        event.preventDefault();
        invalidUrlErrorVisible.value = true;
        setTimeout(() => {
            invalidUrlErrorVisible.value = false;
        }, 3000);
    }
}

const statusMap = new Map<number, string>([
    [200, "success"],
    [201, "success"],
    [204, "success"],
    [400, "error"],
    [404, "error"],
]);

// UI display state
const inputValue = ref("");
const invalidUrlErrorVisible = ref(false);
const statusSuccess = ref(false);
const statusVisible = ref(false);
const statusCode = ref<number>();
const responseContents = ref<PostResponse>();
const responseMessage = ref("");

async function POST_shortcode(event: Event) {
    event.preventDefault();
    let [data, status, message] = await postURL("/shorten", inputValue.value);
    console.log(data);
    responseMessage.value = message;
    statusCode.value = status;
    if (statusMap.get(status) === "error") {
        statusSuccess.value = false;
    } else {
        responseContents.value = data as PostResponse;
        statusSuccess.value = true;
    }
    statusVisible.value = true;

    inputValue.value = "";
}
</script>

<template>
    <h2>{{ props.title }}</h2>
    <form @submit="POST_shortcode($event)" :method>
        <input v-model="inputValue" type="text" name="url" :placeholder />
        <input
            @click="validateInput($event, inputValue)"
            type="submit"
            value="Submit"
        />
    </form>
    <p class="invalid-url-message" :class="{ visible: invalidUrlErrorVisible }">
        Invalid URL.
    </p>

    <code class="response-status" :class="{ visible: statusVisible }">
        <p>
            Status:
            <span
                class="status-code"
                :class="[statusSuccess ? 'success' : 'error']"
                >{{ statusCode }}</span
            >
        </p>
        <p class="status-message">{{ responseMessage }}</p>
    </code>
    <div class="response-contents" :class="{ visible: statusSuccess }">
        <code>
            { <br />
            <div v-for="(value, key) of responseContents">
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
