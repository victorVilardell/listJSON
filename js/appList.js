var ConstructorList = {

	getData: data.stat,
	container : $(".contentList"),
	controller_page: {
		per_page:50,
		page:0
	},


	generateList :  function() {

		$(this.container).find("li").remove();

		for (var i = (this.controller_page.per_page * this.controller_page.page); i < ((this.controller_page.per_page * this.controller_page.page) + this.controller_page.per_page); i++ ) {
			var cityName = $("<span>"+ this.getData[i].city +"</span>");
			var stateName = $("<span class='bold'>"+ this.getData[i].state +"</span>");
			var itemList = $("<li data-id-city='"+this.getData[i]._id+"' class='list-group-item'/>").append(cityName, stateName);
			$(this.container).append(itemList);
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
		$(".btnNext").on("click", function(e) {
			e.preventDefault();
			ConstructorList.nextPaginator();
		});

		$(".btnPrev").on("click", function(e) {
			e.preventDefault();
			ConstructorList.prevPaginator();
		})
	},

	init : function() {
		this.generateList();
		this.events();

	}

}

ConstructorList.init();