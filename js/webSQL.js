var WebSQL = {

	db: {
		generate: window.openDatabase('zips', '1.0', 'USA zip code', 5 * 1024 * 1024 ),

		onError: function(tx, ex) {
		  alert("Error: " + ex.message);
		},

		onSuccess: function(tx, results) {
			var len = results.rows.length;

			console.log ("hola");

			var info;

			for(var i = 0; i < len; i++) {

				// render found zips item
				info += WebSQL.render(results.rows.item(i));
			}



		}
	},

	generateDB: function() {
		WebSQL.db.generate.transaction(function (tx) {
		  tx.executeSql(
		    'CREATE TABLE IF NOT EXISTS zips '+ 
		    '(city TEXT, loc NUMERIC, pop NUMERIC, state TEXT, id INTEGER)',
		    [], 
		    WebSQL.db.onSuccess, 
		    WebSQL.db.onError
		  );
		})
	},

	addItemDB: function(item) {

		WebSQL.db.generate.transaction(function(tx) {
			tx.executeSql(
				'INSERT INTO zips(city, loc, pop, state, id) VALUES (?, ?, ?, ?, ?)',
				[
					item.city,
					item.loc,
					item.pop,
					item.state,
					item.id
				],
				WebSQL.db.onSuccess, 
		    	WebSQL.db.onError
			);
		})

	},

	modifyItemDB: function(item) {

		WebSQL.db.generate.transaction(function(tx) {
			tx.executeSql(
				'UPDATE zips SET ? = ? WHERE id = ?',
				[
					item.col,
					item.valueCol,
					item.id
				],
				WebSQL.db.onSuccess,
		    	WebSQL.db.onError
			);
		})
		
	},

	removeItemDB: function(id) {
		WebSQL.db.generate.transaction(function (tx) {
			tx.executeSql(
				'DELETE FROM zips WHERE id = ?',
				[
					id
				],
				WebSQL.db.onSuccess, 
		    	WebSQL.db.onError
			);
		})
	},

	readDB: function() {
		WebSQL.db.generate.transaction(function (tx) {
			tx.executeSql(
	    		'SELECT * FROM zips',
	    		[],
	    		WebSQL.db.onSuccess, 
		    	WebSQL.db.onError
			)
		})
	},

	readDBnotRepeat: function(column) {
		var selecColumn = column;
		WebSQL.db.generate.transaction(function (tx) {
			tx.executeSql(
	    		'SELECT DISTINCT zips FROM ?',
	    		[
	    			selecColumn
	    		],
	    		WebSQL.db.onSuccess, 
		    	WebSQL.db.onError
			)
		})
	},

	render: function(data) {

		return  "<p>"+ data.todo +"</p>";

	},

	index: function() {
		this.generateDB();
	}

};

