import { reactive } from "vue";
import type { DatabaseResponse } from "../types";

// UI display state
export const UI_state = reactive({
  inputValue: "",
  invalidUrlErrorVisible: false,
  statusSuccess: false,
  statusVisible: false,
  statusCode: 0,
  responseContents: {} as DatabaseResponse,
  responseMessage: "",
});
