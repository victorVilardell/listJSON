var ConstructorList = {

	getData: data.stat,
	container : null,
	controller_page: {
		per_page:50,
		page:0
	},


	generateList :  function() {

		$(this.container).find("li").remove();

		var templateList = $("#tplList").html();

		for (var i = (this.controller_page.per_page * this.controller_page.page); i < ((this.controller_page.per_page * this.controller_page.page) + this.controller_page.per_page); i++ ) {
			var infoResult = {
				cityName: this.getData[i].city,
				stateName: this.getData[i].state
			}
			var html = Mustache.render(templateList, infoResult);
			$(this.container).append(html);
		}


	},

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
		this.events();

	}

}

ConstructorList.init(".contentList");