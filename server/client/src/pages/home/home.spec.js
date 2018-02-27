import HomePage from './home';

describe('HomePage', () => {
  beforeEach(() => {
    spyOn(console, 'log').and.callThrough();

    new HomePage().show();
  });

  it('displays a console message', () => {
    expect(console.log).toHaveBeenCalledWith('Welcome Back!');
  });
});
