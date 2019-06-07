global.localStorage = {
    _data: {},
    setItem: function(id, val) {
        return this._data[id] = val;
    },
    getItem: function(id) {
        return this._data[id];
    }
};