import actionElement from "./element";
import actionLocation from "./location";
import actionSupport from "./support";
import actionBattle from "./battle";
import actionExternal from "./external";
import packer from "~/lib/messaging/packer";
import assign from "lodash/assign";

const noop = () => {};
const respond = (result) => {
  console.log(result);
  chrome.runtime.sendMessage(result, noop);
};
export const actions = assign({
  "hello": function() {
    return packer("hello");
  },
  "error": function(name) {
    return packer("error", `Action ${name} not found!`);
  }
}, actionElement, actionLocation, 
actionSupport, actionBattle, 
actionExternal);

export function sendAction(action, args) {
  const handler = actions[action];
  if (!action) {
    throw new Error("Action not found!");
  }
  const result = handler(args, respond);
  if (result !== undefined) {
    respond(result);
  }
}

export default actions;
