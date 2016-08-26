if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
} else {

	// En la siguiente linea, puede incluir prefijos de implementacion que quiera probar.
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	// No use "var indexedDB = ..." Si no está en una función.
	// Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	// (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)

	var startDB = {

		dataBase: indexedDB.open("zips", 1),

		configDataBase: function() {

			this.dataBase.onupgradeneeded = function(e) {
				var active =startDB.dataBase.result;
				var options = {
					keyPath: 'id',
					autoIncrement: true,
					index: [
						{
							nameIndex: "by_name",
							nameCol: "name",
							unique: false
						},
						{
							nameIndex: "by_dni",
							nameCol: "dni",
							unique: true
						}
					]
				};
				var thisdb = active.createObjectStore("people", { keyPath : 'id', autoIncrement : true });

				startDB.initIndexDB(thisdb, options.index)

			};


            this.dataBase.onsuccess = function (e) {
                alert('Base de datos cargada correctamente');
    
            };
    
            this.dataBase.onerror = function (e)  {
                alert('Error cargando la base de datos');
            };

		},

		initIndexDB: function(store, dateArray) {

			dateArray.map(function(e){
				store.createIndex(e.nameIndex, e.nameCol, { unique : e.unique })
			})

		},


		addDBElem: function(elemPush) {

			var active = startDB.dataBase.result;
            var data = active.transaction(["people"], "readwrite");
            var object = data.objectStore("people");

			var request = object.put(elemPush);

			request.onerror = function (e) {
                alert(request.error.name + '\n\n' + request.error.message);
            };

            data.oncomplete = function (e) {
                alert('Objeto agregado correctamente');
            };

		},

		index: function() {
			this.dataBase;
			this.configDataBase();
		}

	}

}

startDB.index();
