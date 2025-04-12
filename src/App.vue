<script setup lang="ts">
import { ref } from "vue";
import Submit from "./components/Submit.vue";
import { UI_state } from "./components/store";

type visibleStates = {
    [key: string]: boolean;
};

const tabVisibility = ref<visibleStates>({
    create: true,
    retrieve: false,
    update: false,
    delete: false,
    stats: false,
});

function toggleVisibility(event: Event) {
    const button = event.target as EventTarget as HTMLButtonElement;
    const action = button.dataset.action as string;
    for (const key in tabVisibility.value) {
        tabVisibility.value[key] = false;
    }
    tabVisibility.value[action] = true;
    UI_state.reset();
}
</script>

<template>
    <header>
        <h1>Shortcode API Client</h1>
        <p class="about">Create and manage short URLs.</p>
    </header>
    <div class="grid">
        <div class="action-tabs">
            <button
                @click="toggleVisibility($event)"
                data-action="create"
                :class="{ selected: tabVisibility.create }"
            >
                Create
            </button>
            <button
                @click="toggleVisibility($event)"
                data-action="retrieve"
                :class="{ selected: tabVisibility.retrieve }"
            >
                Retrieve
            </button>
            <button
                @click="toggleVisibility($event)"
                data-action="update"
                :class="{ selected: tabVisibility.update }"
            >
                Update
            </button>
            <button
                @click="toggleVisibility($event)"
                data-action="delete"
                :class="{ selected: tabVisibility.delete }"
            >
                Delete
            </button>
            <button
                @click="toggleVisibility($event)"
                data-action="stats"
                :class="{ selected: tabVisibility.stats }"
            >
                Stats
            </button>
        </div>

        <section v-if="tabVisibility.create" class="create action-wrapper">
            <Submit
                :title="'Create a Shortcode'"
                :method="'post'"
                :placeholder="'Enter a URL'"
                :action="'create'"
            />
        </section>

        <section v-if="tabVisibility.retrieve" class="retrieve action-wrapper">
            <Submit
                :title="'Retrieve a URL'"
                :method="'get'"
                :placeholder="'Enter a Shortcode'"
                :action="'retrieve'"
            />
        </section>

        <section v-if="tabVisibility.update" class="update action-wrapper">
            <Submit
                :title="'Update a URL'"
                :method="'put'"
                :placeholder="'Enter a Shortcode'"
                :action="'update'"
            />
        </section>

        <section v-if="tabVisibility.delete" class="delete action-wrapper">
            <Submit
                :title="'Delete a Shortcode'"
                :method="'delete'"
                :placeholder="'Enter a Shortcode'"
                :action="'delete'"
            />
        </section>

        <section v-if="tabVisibility.stats" class="stats action-wrapper">
            <Submit
                :title="'Get Access Statistics for a Shortcode'"
                :method="'get'"
                :placeholder="'Enter a Shortcode'"
                :action="'stats'"
            />
        </section>
    </div>
</template>

<style scoped>
header {
    padding-bottom: 1.75em;
    border-bottom: dashed 3px #454545;
}
p.about {
    margin-top: 0;
    color: var(--green);
    font-size: 1.2rem;
    font-weight: 550;
}
.action-wrapper {
    padding-top: 1.75rem;
}
</style>
