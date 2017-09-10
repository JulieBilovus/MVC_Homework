var model = {
    currentPerson: {},
    allPersons: [
        {
        name: 'Lily Butler',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
      },
      {
        name: 'Waller Perry',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
      },
      {
        name: 'Tammi Donovan',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
      },
      {
        name: 'Doreen Flowers',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
      },
      {
        name: 'Price Pace',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
      },
      {
        name: 'Larson Maldonado',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
      },
      {
        name: 'Berg Bolton',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
      },
      {
        name: 'Mack Lott',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
      },
      {
        name: 'Rosanna Mcleod',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
      },
      {
        name: 'Rosalie Rice',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
      },
      {
        name: 'Virginia Buchanan',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
      },
      {
        name: 'Lorna Stein',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
      },
      {
        name: 'Rosalie Steele',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
      },
      {
        name: 'Wilcox Boyd',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
      },
      {
        name: 'Ollie Rice',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
      }
    ]
};

var control = {
    init: function(){
        listView.init();
        listView.render();

        scoresView.init();
        scoresView.render();

        profileView.init();
        dataView.init();

        arrowsView.init();
        arrowsView.render();
    },
    getAllNames: function(){
        var names = [];
        model.allPersons.forEach(function(item){
            names.push(item.name);
        });
        return names;
    },
    getAllScores: function(){
        var scores = [];
        model.allPersons.forEach(function(item){
            scores.push(item.score);
        });
        return scores;
    },
    setCurrentPerson: function(index){
        model.currentPerson = model.allPersons[index];
        this.viewCurrentProfile();
    },
    getCurrentPerson: function(){
        return model.currentPerson;
    },
    viewCurrentProfile: function(){
        profileView.render();
        dataView.render();
    },
    setCurrentPersonScore: function(value){
        model.currentPerson.score = value;
        profileView.render();
        scoresView.render();
    }
};

var arrowsView = {
    init: function(){
        this.$container = $('.arrows');
        this.handleClicks();
    },
    render: function(){
        var listStr = '';
        var ID = 0;
        model.allPersons.forEach(function(){
            listStr += '<li data-id="' + ID + '"><span class="up"></span><span class="down"></span></li>';
            ID++;
        });
        this.$container.html(listStr);
    },
    handleClicks: function(){
        this.$container.on('click','span', function(e){
            var target = e.target;
            target = +(target.parentNode.getAttribute("data-id"));
            var rememberForUse = model.allPersons[target];

            if(e.target.className === 'up' && target !== 0) {
                model.allPersons[target] = model.allPersons[--target];
                model.allPersons[target--] = rememberForUse;
            } 
            else if (e.target.className === 'down' && target !== model.allPersons - 1) {
                model.allPersons[target] = model.allPersons[++target];
                model.allPersons[target++] = rememberForUse;               
            }
            listView.init();
            listView.render();
            scoresView.init();
            scoresView.render();
        });
    }
};

var listView = {
    init: function(){
        this.$container = $('.names');
        this.handleClicks();
    },
    render: function(){
        var listStr = '';
        control.getAllNames().forEach(function(name){
            listStr += '<li>'+name+'</li>';
        });
        this.$container.html(listStr);
    },
    handleClicks: function(){
        this.$container.on('click','li', function(e){
            var currentIndex = $(e.target).index();
            control.setCurrentPerson(currentIndex);
        });
    }
};


var scoresView = {
    init: function(){
        this.$container = $('.scores');
        this.handleClicks();
    },
    render: function(){
        var listStr = '';
        control.getAllScores().forEach(function(score){
            listStr +=   '<li>'
                        +'  <span>'+score+'</span>'
                        +'  <input class="hidden score-input" type="text" value="'+score+'">'
                        +'</li>';
        });
        this.$container.html(listStr);
    },
    handleClicks: function(){
        this.$container.on('click', 'li', function(e){
            var $currentLi = $(e.target);
            var $currentSpan = $currentLi.find('span');
            var $currentInput = $currentLi.find('input.score-input');
            var currentIndex = $currentLi.index();
            if(!$currentInput.is('.hidden')) {
                return false;
            }
            control.setCurrentPerson(currentIndex);
            $currentSpan.addClass('hidden');
            $currentInput.removeClass('hidden').focus();
        });
        this.$container.on('focusout .score-input', function(e){
            var newScore = $(e.target).val();
            control.setCurrentPersonScore(newScore);
        });
    }
};


var profileView = {
    init: function(){
        this.$container = $('.profile');
    },
    render: function(){
        var currentPerson = control.getCurrentPerson();
        var tempalte = '<img src="'+currentPerson.photoUrl+'">'
                        + '<h3>'+ currentPerson.name +'</h3>'
                        + '<p>Score: '+currentPerson.score+'</p>';
        this.$container.html(tempalte);
    }
};

var dataView = {
    init: function(){
        this.$container = $('.currentPersonData');
    },
    render: function(){
        var currentPerson = control.getCurrentPerson();
        var tempalte = '<p> Selected person is '
                        + '<span>'+ currentPerson.name +'</span>'
                        + '. Person`s score is: '+currentPerson.score+'</p>';
        this.$container.html(tempalte)
    }
};

control.init();