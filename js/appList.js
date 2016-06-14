var ConstructorList = {

	getData: data.stat,
	controller_page: {
		per_page:50,
		page:0
	},


	generateList :  function() {

		for (var i = (this.controller_page.per_page * this.controller_page.page); i < ((this.controller_page.per_page * this.controller_page.page) + this.controller_page.per_page); i++ ) {
			console.log (this.getData[i].city);
		}


	},

	init : function() {
		this.generateList();

	}

}

ConstructorList.init();