var ConstructorList = {

	getData: data.stat,
	//db : openDatabase('ZIPS', '1.0', 'Test DB', 2 * 1024 * 1024),
	container : null,
	controller_page: {
		per_page:50,
		page:0
	},


	generateList :  function(thisJSON) {
		var getData;
		if (thisJSON != undefined) {
			getDataList = thisJSON
		} else {
			getDataList = this.getData
		}

		$(this.container).find("li").remove();

		var templateList = $("#tplList").html();

		for (var i = (this.controller_page.per_page * this.controller_page.page); i < ((this.controller_page.per_page * this.controller_page.page) + this.controller_page.per_page); i++ ) {
			var infoResult = {
				idCity: getDataList[i]._id,
				cityName: getDataList[i].city,
				stateName: getDataList[i].state
			}

			var html = Mustache.render(templateList, infoResult);
			$(this.container).append(html);
		}


	},

	generateIndexed: function() {

		this.getData.map(function(e) {
			startDB.addDBElem(e)
		})

	},

	/*generateWebSQL: function() {

		this.getData.map(function(e) {
			WebSQL.addItemDB(e)
		})

	},*/

	/*
	generateFilter : function(tipeFilter) {
		var xx = []
		for (var i = 0; i < this.getData.length; i++ ) {
			xx.push(this.getData[i].state); 
		}

		var uniqueArray = xx.filter(function(item, pos) {
		    return xx.indexOf(item) == pos;
		})

		var templateFilterList = $("#filterState").html();
		var html = Mustache.render(templateFilterList, uniqueArray);
		$(".checkbox").append(html);

	},
	*/

	nextPaginator : function() {
		if (this.controller_page.page < Math.floor(this.getData.length / this.controller_page.per_page)) {
			this.controller_page.page++;
			this.generateList();
		}
	},

	prevPaginator : function() {
		if (this.controller_page.page > 0) {
			this.controller_page.page--;
			this.generateList();
		}
	},

	events : function() {
		$(document).on("click", ".btnNext", function(e) {
			e.preventDefault();
			ConstructorList.nextPaginator();
		});

		$(document).on("click", ".btnPrev", function(e) {
			e.preventDefault();
			ConstructorList.prevPaginator();
		})
	},

	init : function(selector) {
		this.container = selector;
		this.generateList();
		//this.generateFilter();
		this.events();
		//this.generateWebSQL();
		this.generateIndexed();

	}

}
//WebSQL.index();
ConstructorList.init(".contentList");