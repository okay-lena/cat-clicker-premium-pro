let model = {
  cats: [
    {
      name: 'Rocket',
      clicks: 0,
      image: 'img/rocket.jpg'
    },
    {
      name: 'Stalker',
      clicks: 0,
      image: 'img/stalker.jpg'
    },
    {
      name: 'Grumpy',
      clicks: 0,
      image: 'img/grumpy.jpg'
    },
    {
      name: 'Garfi',
      clicks: 0,
      image: 'img/garfi.jpg'
    },
    {
      name: 'Maru',
      clicks: 0,
      image: 'img/maru.jpg'
    }
  ],
  currentCat: null,
  adminFormVisible: false
};

let octopus = {
  init: function() {
    //set current cat to the 1st cat
    model.currentCat = model.cats[0];

    catNamesView.init();
    catToDisplayView.init();
    adminView.init();
  },
  getAllCats: function() {
    return model.cats;
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  addClick: function() {
    model.currentCat.clicks++;  //increment clicks
    catToDisplayView.render();  //re-render view to display new clicks
  },
    displayAdminForm: function() {
        adminView.showForm();
        this.showCatDetails();
        model.adminFormVisible = "true";
    },
    showCatDetails: function() {
        adminView.catNameInForm.value = model.currentCat.name;
        adminView.catImageInForm.value = model.currentCat.image;
        adminView.catClicksInForm.value = model.currentCat.clicks;
    },
    updateCatDetails: function() {
        model.currentCat.name = adminView.catNameInForm.value;
        model.currentCat.image = adminView.catImageInForm.value;
        model.currentCat.clicks = adminView.catClicksInForm.value;
        catNamesView.render();
        catToDisplayView.render();
    },
    hideAdminForm: function() {
        adminView.hideForm();
        model.adminFormVisible = "false";
    }
};

let adminView = {
    init: function() {
        this.admin = document.getElementById('admin');
        this.formSection = document.getElementById('adminFormAndButtons');
        this.form = document.getElementById('adminForm');
        this.catNameInForm = document.getElementById('nameInForm');
        this.catImageInForm = document.getElementById('imageInForm');
        this.catClicksInForm = document.getElementById('clicksInForm');
        this.saveForm = document.getElementById('save');
        this.cancelForm = document.getElementById('cancel');

        //hide the form initially
        this.hideForm();

        this.render();
    },
    render: function() {
        //add listener to admin button to show form
        this.admin.addEventListener('click', function() {
            octopus.displayAdminForm();
        })

        //add listener to cancel button to hide form
        this.cancelForm.addEventListener('click', function() {
            octopus.hideAdminForm();
        })

        //add listener to save button to save data and hide form afterwards
        this.saveForm.addEventListener('click', function() {
            octopus.updateCatDetails();
            octopus.hideAdminForm();
        })
    },
    showForm: function() {
        this.formSection.style.display = "block";
    },
    hideForm: function() {
        this.formSection.style.display = "none";
    },

}

let catNamesView = {
  init: function() {
    // init list element to populate it further
    this.catNamesUl = document.getElementById('listOfCats');

    //render the list
    this.render();
  },

  render: function() {
    //clear html of ul
    this.catNamesUl.innerHTML = '';

    // get all cats
    const cats = octopus.getAllCats();

    let cat, catNameLi;

    //extract cat names
    for (let i = 0; i < cats.length; i++){
      cat = cats[i];

      //create a list item with the name of the cat
      catNameLi = document.createElement('li');
      catNameLi.textContent = cat.name;

      //add click listener
      catNameLi.addEventListener('click', (function(catCopy) {
        return function() {
          //change current cat
          octopus.setCurrentCat(catCopy);
            octopus.showCatDetails();
          catToDisplayView.render();
        };
      })(cat));

      //display new li
      this.catNamesUl.appendChild(catNameLi);
    };


  }
};

let catToDisplayView = {
  init: function() {
    //reference to DOM elements
    this.selectedCatImg = document.getElementById('selectedCat');
    this.selectedCatName = document.getElementById('selectedCatName');
    this.clicksOnCat = document.getElementById('clicks');

    //increment clicks on img click
    this.selectedCatImg.addEventListener('click', function() {
      octopus.addClick();
        octopus.showCatDetails();
    });

    this.render();
  },

  render: function() {
    let currentCat = octopus.getCurrentCat();
    this.selectedCatImg.src = currentCat.image;
    this.selectedCatName.textContent = currentCat.name;
    this.clicksOnCat.textContent = currentCat.clicks;
  }
};

octopus.init();
