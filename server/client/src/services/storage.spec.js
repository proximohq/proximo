import storage from './storage';

describe('Storage', () => {
  describe('set', () => {
    describe('when the local storage is well formed', () => {
      let proximo;

      beforeEach(() => {
        window.localStorage.proximo = JSON.stringify({
          hello: { world: false },
          foo: 'bar'
        });

        storage.set('hello', { world: true });

        proximo = JSON.parse(window.localStorage.proximo);
      });

      it('stores the session correctly in the proximo container', () => {
        expect(proximo).toEqual(jasmine.objectContaining({
          hello: { world: true }
        }));
      });

      it('preserves values already stored inside the proximo container', () => {
        expect(proximo.foo).toBe('bar');
      });
    });

    describe('when the local storage is not well formed', () => {
      let proximo;

      beforeEach(() => {
        window.localStorage.proximo = '[object Object]';

        storage.set('hello', { world: true });

        proximo = JSON.parse(window.localStorage.proximo);
      });

      it('stores the session correctly in the proximo container', () => {
        expect(proximo).toEqual({
          hello: { world: true }
        });
      });
    });
  });

  describe('Get', () => {
    let value;

    describe('when the value is defined', () => {
      beforeEach(() => {
        storage.set('hello', 'world');

        value = storage.get('hello');
      });

      it('returns the stored value', () => {
        expect(value).toBe('world');
      });
    });

    describe('when the value is not defined', () => {
      beforeEach(() => {
        value = storage.get('goodbye');
      });

      it('returns undefined', () => {
        expect(value).not.toBeDefined();
      });
    });
  });
});
