export default {
  set: function set (name, value) {
    const proximo = getProximoStore();

    proximo[name] = value;

    window.localStorage.proximo = JSON.stringify(proximo);
  },

  get: function get (name) {
    const proximo = getProximoStore();

    return proximo[name];
  }
};

function getProximoStore () {
  try {
    return JSON.parse(window.localStorage.proximo);
  } catch (error) {
    return {};
  }
}
