var Station = require('../../src/entities/station.js');
var db = require('../../src/database');

describe('Station:', function() {
  beforeEach(function() {
    db.station = jasmine.createSpyObj('station', ['insert']);
  });

  it('should be defined', function() {
    expect(Station).toBeDefined();
  });

  describe('creating a new station', function() {
    var newStation;

    beforeEach(function() {
      newStation = {
        name: 'Station 1'
      };
    });

    it('should define a .create method', function() {
      expect(Station.create).toBeDefined();
    });

    it('should create a new station', function() {
      db.station.insert.and.callFake(function(doc) {
        expect(doc.name).toBe(newStation.name);
      });

      Station.create(newStation);
      expect(db.station.insert).toHaveBeenCalled();
    });
  });

});
