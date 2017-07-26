class Application {

    constructor() {

        var Editor = require('./Editor.js');
        this.editor = new Editor();

        //La barre qui indique le document actuellement ouvert en haut de l'écran
        this.currentDocAdresseBar = new function(){
            this.placeHolderDiv = $("#currentFileDocAdrBarPlaceHolder");
            this.display = $("<span>Nouveau document non sauvegardé</span>");
                this.placeHolderDiv.append(this.display);
            
            //L'adresse du document actuellement ouvert
            this.currentDocument = undefined;
            
            this.updateCurrentDoc = function(newCurrentDocumentAdress){
                this.currentDocument = newCurrentDocumentAdress;
                this.display.html(this.currentDocument);
            }

            this.getCurrentDoc = function(){
                return this.currentDocument;
            }
        }

        
        //Nécessaire à cause des events de boutons
        var _this = this;
        //Réglage du bouton openFile dans le menu
        this.loadFromMenu = $('#open_from_menu');
            this.loadFromMenu.on("click", function(){

                    const dialog = require('electron').remote.dialog;
                    //Ouvre une boite de dialog openFile qui n'accepte qu'un fichier xml
                    dialog.showOpenDialog({
                            filters: [
                                {name: 'XML File', extensions: ['xml']}
                            ],
                            properties: ['openFile']
                        }, 
                        function(files){
                            try {
                                _this.openAFile(files[0]);
                                //Si le fichier réussit à s'ouvrir et à être interprété 
                                //alors currentDocument est setter à l'adresse du fichier
                                _this.currentDocAdresseBar.updateCurrentDoc(files[0]);
                            } catch(err) {

                            }
                    });

            });
        
        //Réglage du bouton saveAsFile dans le menu
        this.saveAsFromMenu = $('#saveAs_from_menu');
            this.saveAsFromMenu.on("click", function(){
                    try {
                        _this.saveAFileAs();
                    } catch(err) {

                    }
            });

        //Réglage du bouton print dans le menu
        this.printFromMenu = $('#print_from_menu');
            this.printFromMenu.on("click", function(){

            });

        //Réglage du bouton save dans la quick barre
        this.saveFromQuickBar = $('#save_from_quickBar');
            this.saveFromQuickBar.on("click", function(){
                try {
                    _this.saveAFile(_this.currentDocAdresseBar.getCurrentDoc());
                } catch(err) {

                    //Si le fichier ne réussit pas à être enregistré
                    //alors setter currentDocument à undefined
                    _this.currentDocAdresseBar.updateCurrentDoc(undefined);
                    
                    //Faire apparaitre une alerte à l'utilisateur
                    
                    //Si il click ok sur l'alerte, lancer la procédure saveAs
                    /*if(ok) {
                        _this.saveAFileAs();
                    }*/
                    //Si il click annuler sur l'alerte, ne rien faire.

                }
            });


    }

    openAFile(filePath) {
        var fs = require('fs');
        fs.readFile(filePath, 'utf-8', (err, data)=>{
            /*if(err){

            }*/
            console.log("File content : "+data);
            
            /*var xml2js = require('xml2js')
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(data);
            console.log("Same thing but in xml : "+xml);*/

            //var parser = require('xml2js').Parser({explicitChildren:true});
            //var parser = require('xml2js').Parser({explicitChildren:true, explicitRoot:false});
            //[{explicitRoot:false}, {explicitChildren:true}, {preserveChildrenOrder:true}]
            //var json = parser.parseString(data, function(err, result)
            //{
            //    const util = require('util');
            //    console.log("Same thing but in json : "+util.inspect(result, false, null));
            //});

            this.editor.analyzeAndLoad(data);

        });
    }

    saveAFile(fileName) {
        var fs = require('fs');
        var content = this.editor.stringifyToXmlCurrentDocument();
        console.log(content);
        fs.writeFile(fileName, content, function (err) {
            /*if(err){
                alert("An error ocurred creating the file "+ err.message);
            }*/
        });
    }
    
    saveAFileAs() {
        const dialog = require('electron').remote.dialog;
        //Ouvre une boite de dialog saveFile qui enregistre en tant que fichier xml
        dialog.showSaveDialog({
                filters: [
                    {name: 'XML File', extensions: ['xml']}
                ]
            }, 
            (fileName)=>{
                //A réactiver plus tard
                //try {
                    this.saveAFile(fileName);
                    this.currentDocAdresseBar.updateCurrentDoc(fileName);
                /*} catch(err) {
                    alert("error ocurred in saveAFileAs() "+err.message);
                }*/
        });
    }

}
module.exports = Application;