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

  reset: function () {
    this.inputValue = "";
    this.invalidUrlErrorVisible = false;
    this.statusSuccess = false;
    this.statusVisible = false;
    this.statusCode = 0;
    this.responseContents = {} as DatabaseResponse;
    this.responseMessage = "";
  },
});
