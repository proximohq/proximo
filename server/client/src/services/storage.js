export default {
  /**
   * Stores the given value in a local storage container using the given name for that container.
   *
   * @param {String} name the name of the container for the value.
   * @param {*} value the value to store.
   */
  set: function set (name, value) {
    const proximo = getProximoStore();

    proximo[name] = value;

    window.localStorage.proximo = JSON.stringify(proximo);
  },

  /**
   * Gets the value stored in the storage container.
   *
   * @param {String} name the name of the container that is storing the value.
   * @return {*} Returns the value stored in the container or Undefined.
   */
  get: function get (name) {
    const proximo = getProximoStore();

    return proximo[name];
  }
};

/**
 * Returns the local storage container for Proximo.
 *
 * @return {Object}
 */
function getProximoStore () {
  try {
    return JSON.parse(window.localStorage.proximo);
  } catch (error) {
    return {};
  }
}
