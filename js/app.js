var initialCats = [
    {
        clickCount: 0,
        name: 'Tabby',
        imgSrc: 'img/434164568_fea0ad4013_z.jpg',
        imgAttribution: 'https://www.flickr.com/',
        nicknames: [ 'Tabtab', 'Mike', 'Rocky' ],
    },
    {
        clickCount: 0,
        name: 'Tigger',
        imgSrc: 'img/22252709_010df3379e_z.jpg',
        imgAttribution: 'https://www.flickr.com/',
        nicknames: [ 'Tigger' ],
    },
    {
        clickCount: 0,
        name: 'Casper',
        imgSrc: 'img/1413379559_412a540d29_z.jpg',
        imgAttribution: 'https://www.flickr.com/',
        nicknames: [ 'Buuuh', 'Grumpy' ],
    },
    {
        clickCount: 0,
        name: 'Mochy',
        imgSrc: 'img/4154543904_6e2428c421_z.jpg',
        imgAttribution: 'https://www.flickr.com/',
        nicknames: [ 'Mocholate' ],
    },
    {
        clickCount: 0,
        name: 'Flux',
        imgSrc: 'img/9648464288_2516b35537_z.jpg',
        imgAttribution: 'https://www.flickr.com/',
        nicknames: [ 'Flussschhh' ],
    }
];

var Cat = function(data) {

    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    // http://knockoutjs.com/documentation/foreach-binding.html
    this.nicknames = ko.observableArray(data.nicknames);

    // http://knockoutjs.com/documentation/computedObservables.html
    this.level = ko.computed(function() {
        var clicks = this.clickCount();
        var level;

        if (clicks < 10) {
            level = 'Infant';
        } else if (clicks < 20) {
            level ='Apprentice';
        } else if (clicks < 30) {
            level = 'Master';
        } else if (clicks < 40) {
            level = 'Ninja';
        } else if (clicks < 50) {
            level = 'Bruce Lee';
        } else {
            level = 'Muhammad Ali';
        }
        return level;
    }, this);

    /*this.level = ko.computed(function() {
        if (this.clickCount() >= 10 && this.clickCount() <= 19) {
            return 'Infant';
        } else if (this.clickCount() >= 20 && this.clickCount() <= 29) {
            return 'Apprendice';
        } else if (this.clickCount() >= 30) {
            return 'Master';
        } else {
            return 'Baby';
        }
    }, this);*/

}

// TODO
//
// [] Make the cats show up in a list
//
// [] Make the `currentCat` change when you click on a cat in the list
//
// [] Make something more

var ViewModel = function() {

    // Keep a pointer to outer this
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem) {
        self.catList.push( new Cat(catItem) );
    });

    this.currentCat = ko.observable( this.catList()[0] );

    this.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    // NOTE The `updateCat` problem was a binding scope problem!
    // The actual data can be passed as a function parameter!
    // Look at the documentation!
    // http://knockoutjs.com/documentation/click-binding.html
    this.updateCat =  function(clickedCat) {
        // Why this works but the `ko.observable()` not!?
        // self.currentCat = ko.observable(clickedCat);
        self.currentCat(clickedCat);
    }

}

ko.applyBindings(new ViewModel());
