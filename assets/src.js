Vue.component('thumbnail', {
  template: "#thumbnail-template",
  props: ['image'],
  methods: {
    displayImage: function () {
      var dialog = document.querySelector('dialog');
      var showDialogButton = this.$el
      dialog.querySelector(".dialog_image").src = this.image.src
      dialog.querySelector(".caption").innerHTML = "<table><tbody><tr><th>"+ this.image.title + "</th><td>"+ this.image.desc + "</td></tr></tbody></table>"
      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      showDialogButton.addEventListener('click', function() {
        dialog.showModal();
      });
      dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
    }
  },
})

var appVue = new Vue({
  el: '#memories',
  data: {
    sort:'id',
    order: 1,
    searchText: '',
    fields: ['title', 'site', 'desc'],
    images: [
      {
        id: 1,
        src: 'http://images.grasshopper.com/2013/10/happy-people-coworking.jpg',
        title: 'Coworking',
        date: '2016',
        site: 'Malaysia',
        like: 4,
        desc: 'coworking is great!',
      },
      {
        id: 2,
        src: 'http://www.projectmanagers.net/i/wp-content/uploads/2013/02/bigstock-Group-of-happy-young-business-50927732.jpg',
        title: 'Brainstorming',
        date: '2013',
        site: 'Spain',
        like: 1,
        desc: 'Brainstorming for a new product!',
      },
      {
        id: 3,
        src: 'http://i.huffpost.com/gen/1832336/images/n-HAPPY-EMPLOYEE-large570.jpg',
        title: 'We did it!',
        date: '2016',
        site: 'USA',
        like: 0,
        desc: 'We won the contract!',
      },
      {
        id: 4,
        src: 'http://il6.picdn.net/shutterstock/videos/5658755/thumb/9.jpg',
        title: 'Team building',
        date: '2015',
        site: 'Sweden',
        like: 3,
        desc: 'Working all together',
      },
      {
        id: 4,
        src: 'http://1.bp.blogspot.com/_AsgGlcNuJtU/S_ClPsz4CII/AAAAAAAAAgI/yboWMv0YSi8/s1600/happy_office_hour.jpg',
        title: 'Celebration',
        date: '2015',
        site: 'Sweden',
        like: 3,
        desc: 'Celebration at the office!',
      },
    ]
  },
  computed: {
    featured: function() {
      var currentMax = 0;
      var result = null;
      this.images.forEach(function(image) {
        if(image.like >= currentMax){
          currentMax = image.like;
          result = image;
        }
      });
      return result;
    },
    currentDisplay: function() {
      var result = new Array();
      switch(this.sort) {
        case "id":
        result.push({title:"", images: new Array()});
        this.images.forEach(function(image) {
          result[0].images.push(image);
        });
        result[0].images.sort(function(a, b){
          return a.id - b.id;
        });
        break;
        case "date":
        var tmpYears = new Array();
        this.images.forEach(function(image){
          if (tmpYears.indexOf(image.date) < 0) {
            result.push({title: image.date, images: new Array()});
            tmpYears.push(image.date);
          }
          result.forEach(function(year) {
            if(year.title == image.date) {
              year.images.push(image);
            }
          });
        });
        result.sort(function(a, b) {
          return parseInt(b.title) - parseInt(a.title);
        });
        break;
        case "site":
        var tmpCities = new Array();
        this.images.forEach(function(image){
          if (tmpCities.indexOf(image.site) < 0) {
            result.push({title: image.site, images: new Array()});
            tmpCities.push(image.site);
          }
          result.forEach(function(city) {
            if(city.title == image.site) {
              city.images.push(image);
            }
          });
        });
        break;
        case "like":
        result.push({title:"", images: new Array()});
        this.images.forEach(function(image) {
          result[0].images.push(image);
        });
        result[0].images.sort(function(a, b){
          return b.like - a.like;
        });
        break;
      }
      return result;
    }
  },
})
