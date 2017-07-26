
class Editor {
    
    constructor() {

        //On récupère la div qui entoure toutes la zone éditeur
        this.editorDiv = $('#editorDiv');
        
            //On récupère la div de la cataloguesBar
            this.cataloguesBarDiv = $('#cataloguesBarPlaceHolder');
            //On récupère la div du tabsSystem
            this.tabsSystemDiv = $('#tabsSystemPlaceHolder');

            //On met en place une séparation verticale déplacable entre catalogueBarDiv et tabsSystemDiv
            this.editorDiv.split({
                orientation: 'vertical',
                limit: 100,
                position: '220px'//'20%'
            });
                

            ////////////////////////////
            ////////////////////////////
            this.cataloguesBarDiv.addClass("tab-content");


                ///////////////////////////////
                ///////////CATALOGUES//////////


                ///MainProgramCatalogue : 
                this.mainProgramCatalogue = new function(){
                    this.catBarDiv = $("<div></div>");
                        this.catBarDiv.addClass("MainProgCatBar");

                    this.subCatalogues = [];
                        
                        var subCatBases_mainProg = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#basesCollapse_mainProg"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Bases</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="basesCollapse_mainProg" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcSpVarDeclar = $('<li class="list-group-item"></li>'); ul.append(li_SrcSpVarDeclar);

                                                var srcSpVarDeclar_className = "SpVariableDeclaration";
                                                var srcSpVarDeclar_illustration = $("<p>Var X</p>");
                                                var SpVariableDeclaration = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/SpVariableDeclaration.js');
                                                var srcSpVarDeclar_nodeGenerateFunction = function(){ return new SpVariableDeclaration() };

                                                this.srcSpVarDeclar = new NodeCreator(srcSpVarDeclar_className, srcSpVarDeclar_illustration, srcSpVarDeclar_nodeGenerateFunction); li_SrcSpVarDeclar.append(this.srcSpVarDeclar.getNodeCreatorDiv());

                                            var li_SrcAssignment = $('<li class="list-group-item"></li>'); ul.append(li_SrcAssignment);

                                                var srcAssignment_className = "Assignment";
                                                var srcAssignment_illustration = $("<p>X <-- ...</p>");
                                                var Assignment = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/Assignment.js');
                                                var srcAssignment_nodeGenerateFunction = function(){ return new Assignment() };

                                                this.srcAssignment = new NodeCreator(srcAssignment_className, srcAssignment_illustration, srcAssignment_nodeGenerateFunction); li_SrcAssignment.append(this.srcAssignment.getNodeCreatorDiv());

                                            var li_SrcArrayDeclar = $('<li class="list-group-item"></li>'); ul.append(li_SrcArrayDeclar);

                                                var srcArrayDeclar_className = "ArrayDeclaration";
                                                var srcArrayDeclar_illustration = $("<p>Var tab : Array[...]</p>");
                                                var ArrayDeclaration = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/ArrayDeclaration.js');
                                                var srcArrayDeclar_nodeGenerateFunction = function(){ return new ArrayDeclaration() };

                                                this.srcArrayDeclar = new NodeCreator(srcArrayDeclar_className, srcArrayDeclar_illustration, srcArrayDeclar_nodeGenerateFunction); li_SrcArrayDeclar.append(this.srcArrayDeclar.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatBases_mainProg);


                        var subCatIO_mainProg = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#ioCollapse_mainProg"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">IO</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="ioCollapse_mainProg" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcRead = $('<li class="list-group-item"></li>'); ul.append(li_SrcRead);

                                                var srcRead_className = "Read";
                                                var srcRead_illustration = $("<p>Lire (...)</p>");
                                                var Read = require('./Editor/AllNodes/GraphicalNode/FlatNode/IO/Read.js');
                                                var srcRead_nodeGenerateFunction = function(){ return new Read() };

                                                this.srcRead = new NodeCreator(srcRead_className, srcRead_illustration, srcRead_nodeGenerateFunction); li_SrcRead.append(this.srcRead.getNodeCreatorDiv());

                                            var li_SrcWrite = $('<li class="list-group-item"></li>'); ul.append(li_SrcWrite);

                                                var srcWrite_className = "Write";
                                                var srcWrite_illustration = $("<p>Ecrire (...)</p>");
                                                var Write = require('./Editor/AllNodes/GraphicalNode/FlatNode/IO/Write.js');
                                                var srcWrite_nodeGenerateFunction = function(){ return new Write() };

                                                this.srcWrite = new NodeCreator(srcWrite_className, srcWrite_illustration, srcWrite_nodeGenerateFunction); li_SrcWrite.append(this.srcWrite.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatIO_mainProg);
                        

                        var subCatConditions_mainProg = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#conditionsCollapse_mainProg"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Conditions</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="conditionsCollapse_mainProg" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcIf = $('<li class="list-group-item"></li>'); ul.append(li_SrcIf);

                                                var srcIf_className = "If";
                                                var srcIf_illustration = $("<p>If</p>");
                                                var If = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Conditions/If.js');
                                                var srcIf_nodeGenerateFunction = function(){ return new If() };

                                                this.srcIf = new NodeCreator(srcIf_className, srcIf_illustration, srcIf_nodeGenerateFunction); li_SrcIf.append(this.srcIf.getNodeCreatorDiv());

                                            var li_SrcIfElse = $('<li class="list-group-item"></li>'); ul.append(li_SrcIfElse);

                                                var srcIfElse_className = "IfElse";
                                                var srcIfElse_illustration = $("<p>If - Else</p>");
                                                var IfElse = require('./Editor/AllNodes/GraphicalNode/SpecialNode/IfElse.js');
                                                var srcIfElse_nodeGenerateFunction = function(){ return new IfElse() };

                                                this.srcIfElse = new NodeCreator(srcIfElse_className, srcIfElse_illustration, srcIfElse_nodeGenerateFunction); li_SrcIfElse.append(this.srcIfElse.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatConditions_mainProg);


                        var subCatLoops_mainProg = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#loopsCollapse_mainProg"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Loops</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="loopsCollapse_mainProg" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcWhile = $('<li class="list-group-item"></li>'); ul.append(li_SrcWhile);

                                                var srcWhile_className = "SimpleLoop";
                                                var srcWhile_illustration = $("<p>While</p>");
                                                var SimpleLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoop.js');
                                                var SimpleLoopTypes = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoopTypes.js');
                                                var srcWhile_nodeGenerateFunction = function(){ return new SimpleLoop(SimpleLoopTypes.While) };

                                                this.srcWhile = new NodeCreator(srcWhile_className, srcWhile_illustration, srcWhile_nodeGenerateFunction); li_SrcWhile.append(this.srcWhile.getNodeCreatorDiv());

                                            var li_SrcUntil = $('<li class="list-group-item"></li>'); ul.append(li_SrcUntil);

                                                var srcUntil_className = "SimpleLoop";
                                                var srcUntil_illustration = $("<p>Until</p>");
                                                var SimpleLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoop.js');
                                                var SimpleLoopTypes = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoopTypes.js');
                                                var srcUntil_nodeGenerateFunction = function(){ return new SimpleLoop(SimpleLoopTypes.Until) };

                                                this.srcUntil = new NodeCreator(srcUntil_className, srcUntil_illustration, srcUntil_nodeGenerateFunction); li_SrcUntil.append(this.srcUntil.getNodeCreatorDiv());

                                            var li_SrcDoWhile = $('<li class="list-group-item"></li>'); ul.append(li_SrcDoWhile);

                                                var srcDoWhile_className = "DoLoop";
                                                var srcDoWhile_illustration = $("<p>Do...While</p>");
                                                var DoLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoop.js');
                                                var DoLoopTypes = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoopTypes.js');
                                                var srcDoWhile_nodeGenerateFunction = function(){ return new DoLoop(DoLoopTypes.DoWhile) };

                                                this.srcDoWhile = new NodeCreator(srcDoWhile_className, srcDoWhile_illustration, srcDoWhile_nodeGenerateFunction); li_SrcDoWhile.append(this.srcDoWhile.getNodeCreatorDiv());

                                            var li_SrcDoUntil = $('<li class="list-group-item"></li>'); ul.append(li_SrcDoUntil);

                                                var srcDoUntil_className = "DoLoop";
                                                var srcDoUntil_illustration = $("<p>Do...Until</p>");
                                                var DoLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoop.js');
                                                var DoLoopTypes = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoopTypes.js');
                                                var srcDoUntil_nodeGenerateFunction = function(){ return new DoLoop(DoLoopTypes.DoUntil) };

                                                this.srcDoUntil = new NodeCreator(srcDoUntil_className, srcDoUntil_illustration, srcDoUntil_nodeGenerateFunction); li_SrcDoUntil.append(this.srcDoUntil.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatLoops_mainProg);


                        var subCatSubProgCalls_mainProg = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#subProgCallsCollapse_mainProg"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Sub-Program Calls</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="subProgCallsCollapse_mainProg" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcFunctionCall = $('<li class="list-group-item"></li>'); ul.append(li_SrcFunctionCall);

                                                var srcFunctionCall_className = "FunctionCall";
                                                var srcFunctionCall_illustration = $("<p>X <-- Function (...)</p>");
                                                var FunctionCall = require('./Editor/AllNodes/GraphicalNode/FlatNode/SubProgramCalls/FunctionCall.js');
                                                var srcFunctionCall_nodeGenerateFunction = function(){ return new FunctionCall() };

                                                this.srcFunctionCall = new NodeCreator(srcFunctionCall_className, srcFunctionCall_illustration, srcFunctionCall_nodeGenerateFunction); li_SrcFunctionCall.append(this.srcFunctionCall.getNodeCreatorDiv());

                                            var li_SrcProcedureCall = $('<li class="list-group-item"></li>'); ul.append(li_SrcProcedureCall);

                                                var srcProcedureCall_className = "ProcedureCall";
                                                var srcProcedureCall_illustration = $("<p>Procedure (...)</p>");
                                                var ProcedureCall = require('./Editor/AllNodes/GraphicalNode/FlatNode/SubProgramCalls/ProcedureCall.js');
                                                var srcProcedureCall_nodeGenerateFunction = function(){ return new ProcedureCall() };

                                                this.srcProcedureCall = new NodeCreator(srcProcedureCall_className, srcProcedureCall_illustration, srcProcedureCall_nodeGenerateFunction); li_SrcProcedureCall.append(this.srcProcedureCall.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatSubProgCalls_mainProg);


                    for(let index=0; index<this.subCatalogues.length; ++index){
                        var currentSubCatDiv = this.subCatalogues[index].getSubCatDiv();
                        currentSubCatDiv.addClass("inlineBlock");
                        this.catBarDiv.append(currentSubCatDiv);
                    }
                    
                    this.getCatBarDiv = function(){ return this.catBarDiv; }
                }

                var mainProgCatDiv = this.mainProgramCatalogue.getCatBarDiv();
                    mainProgCatDiv.addClass("tab-pane fade in active");
                    mainProgCatDiv.attr("id","mainProgramCat");
                    this.cataloguesBarDiv.append(mainProgCatDiv);


                ///SubProgramDeclarationCatalogue :
                this.subProgramDeclarationCatalogue = new function(){
                    this.catBarDiv = $("<div></div>");
                        this.catBarDiv.addClass("SubProgDeclCatBar");

                    this.subCatalogues = [];

                        var subCatSubProgDeclars_subProgDecl = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#subProgDeclarsCollapse_subProgDecl"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Sub-Program Declarations</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="subProgDeclarsCollapse_subProgDecl" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcFunctionDeclar = $('<li class="list-group-item"></li>'); ul.append(li_SrcFunctionDeclar);

                                                var srcFunctionDeclar_className = "FunctionDeclaration";
                                                var srcFunctionDeclar_illustration = $("<p>Function (...) { }</p>");
                                                var FunctionDeclaration = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/SubProgramDeclarations/FunctionDeclaration.js');
                                                var srcFunctionDeclar_nodeGenerateFunction = function(){ return new FunctionDeclaration() };

                                                this.srcFunctionDeclar = new NodeCreator(srcFunctionDeclar_className, srcFunctionDeclar_illustration, srcFunctionDeclar_nodeGenerateFunction); li_SrcFunctionDeclar.append(this.srcFunctionDeclar.getNodeCreatorDiv());

                                            var li_SrcProcedureDeclar = $('<li class="list-group-item"></li>'); ul.append(li_SrcProcedureDeclar);

                                                var srcProcedureDeclar_className = "ProcedureDeclaration";
                                                var srcProcedureDeclar_illustration = $("<p>Procedure (...) { }</p>");
                                                var ProcedureDeclaration = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/SubProgramDeclarations/ProcedureDeclaration.js');
                                                var srcProcedureDeclar_nodeGenerateFunction = function(){ return new ProcedureDeclaration() };

                                                this.srcProcedureDeclar = new NodeCreator(srcProcedureDeclar_className, srcProcedureDeclar_illustration, srcProcedureDeclar_nodeGenerateFunction); li_SrcProcedureDeclar.append(this.srcProcedureDeclar.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatSubProgDeclars_subProgDecl);


                        var subCatBases_subProgDecl = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#basesCollapse_subProgDecl"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Bases</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="basesCollapse_subProgDecl" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcSpVarDeclar = $('<li class="list-group-item"></li>'); ul.append(li_SrcSpVarDeclar);

                                                var srcSpVarDeclar_className = "SpVariableDeclaration";
                                                var srcSpVarDeclar_illustration = $("<p>Var X</p>");
                                                var SpVariableDeclaration = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/SpVariableDeclaration.js');
                                                var srcSpVarDeclar_nodeGenerateFunction = function(){ return new SpVariableDeclaration() };

                                                this.srcSpVarDeclar = new NodeCreator(srcSpVarDeclar_className, srcSpVarDeclar_illustration, srcSpVarDeclar_nodeGenerateFunction); li_SrcSpVarDeclar.append(this.srcSpVarDeclar.getNodeCreatorDiv());

                                            var li_SrcAssignment = $('<li class="list-group-item"></li>'); ul.append(li_SrcAssignment);

                                                var srcAssignment_className = "Assignment";
                                                var srcAssignment_illustration = $("<p>X <-- ...</p>");
                                                var Assignment = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/Assignment.js');
                                                var srcAssignment_nodeGenerateFunction = function(){ return new Assignment() };

                                                this.srcAssignment = new NodeCreator(srcAssignment_className, srcAssignment_illustration, srcAssignment_nodeGenerateFunction); li_SrcAssignment.append(this.srcAssignment.getNodeCreatorDiv());

                                            var li_SrcArrayDeclar = $('<li class="list-group-item"></li>'); ul.append(li_SrcArrayDeclar);

                                                var srcArrayDeclar_className = "ArrayDeclaration";
                                                var srcArrayDeclar_illustration = $("<p>Var tab : Array[...]</p>");
                                                var ArrayDeclaration = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/ArrayDeclaration.js');
                                                var srcArrayDeclar_nodeGenerateFunction = function(){ return new ArrayDeclaration() };

                                                this.srcArrayDeclar = new NodeCreator(srcArrayDeclar_className, srcArrayDeclar_illustration, srcArrayDeclar_nodeGenerateFunction); li_SrcArrayDeclar.append(this.srcArrayDeclar.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatBases_subProgDecl);


                        var subCatIO_subProgDecl = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#ioCollapse_subProgDecl"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">IO</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="ioCollapse_subProgDecl" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcRead = $('<li class="list-group-item"></li>'); ul.append(li_SrcRead);

                                                var srcRead_className = "Read";
                                                var srcRead_illustration = $("<p>Lire (...)</p>");
                                                var Read = require('./Editor/AllNodes/GraphicalNode/FlatNode/IO/Read.js');
                                                var srcRead_nodeGenerateFunction = function(){ return new Read() };

                                                this.srcRead = new NodeCreator(srcRead_className, srcRead_illustration, srcRead_nodeGenerateFunction); li_SrcRead.append(this.srcRead.getNodeCreatorDiv());

                                            var li_SrcWrite = $('<li class="list-group-item"></li>'); ul.append(li_SrcWrite);

                                                var srcWrite_className = "Write";
                                                var srcWrite_illustration = $("<p>Ecrire (...)</p>");
                                                var Write = require('./Editor/AllNodes/GraphicalNode/FlatNode/IO/Write.js');
                                                var srcWrite_nodeGenerateFunction = function(){ return new Write() };

                                                this.srcWrite = new NodeCreator(srcWrite_className, srcWrite_illustration, srcWrite_nodeGenerateFunction); li_SrcWrite.append(this.srcWrite.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatIO_subProgDecl);
                        

                        var subCatConditions_subProgDecl = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#conditionsCollapse_subProgDecl"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Conditions</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="conditionsCollapse_subProgDecl" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcIf = $('<li class="list-group-item"></li>'); ul.append(li_SrcIf);

                                                var srcIf_className = "If";
                                                var srcIf_illustration = $("<p>If</p>");
                                                var If = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Conditions/If.js');
                                                var srcIf_nodeGenerateFunction = function(){ return new If() };

                                                this.srcIf = new NodeCreator(srcIf_className, srcIf_illustration, srcIf_nodeGenerateFunction); li_SrcIf.append(this.srcIf.getNodeCreatorDiv());

                                            var li_SrcIfElse = $('<li class="list-group-item"></li>'); ul.append(li_SrcIfElse);

                                                var srcIfElse_className = "IfElse";
                                                var srcIfElse_illustration = $("<p>If - Else</p>");
                                                var IfElse = require('./Editor/AllNodes/GraphicalNode/SpecialNode/IfElse.js');
                                                var srcIfElse_nodeGenerateFunction = function(){ return new IfElse() };

                                                this.srcIfElse = new NodeCreator(srcIfElse_className, srcIfElse_illustration, srcIfElse_nodeGenerateFunction); li_SrcIfElse.append(this.srcIfElse.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatConditions_subProgDecl);


                        var subCatLoops_subProgDecl = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#loopsCollapse_subProgDecl"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Loops</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="loopsCollapse_subProgDecl" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcWhile = $('<li class="list-group-item"></li>'); ul.append(li_SrcWhile);

                                                var srcWhile_className = "SimpleLoop";
                                                var srcWhile_illustration = $("<p>While</p>");
                                                var SimpleLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoop.js');
                                                var SimpleLoopTypes = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoopTypes.js');
                                                var srcWhile_nodeGenerateFunction = function(){ return new SimpleLoop(SimpleLoopTypes.While) };

                                                this.srcWhile = new NodeCreator(srcWhile_className, srcWhile_illustration, srcWhile_nodeGenerateFunction); li_SrcWhile.append(this.srcWhile.getNodeCreatorDiv());

                                            var li_SrcUntil = $('<li class="list-group-item"></li>'); ul.append(li_SrcUntil);

                                                var srcUntil_className = "SimpleLoop";
                                                var srcUntil_illustration = $("<p>Until</p>");
                                                var SimpleLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoop.js');
                                                var SimpleLoopTypes = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoopTypes.js');
                                                var srcUntil_nodeGenerateFunction = function(){ return new SimpleLoop(SimpleLoopTypes.Until) };

                                                this.srcUntil = new NodeCreator(srcUntil_className, srcUntil_illustration, srcUntil_nodeGenerateFunction); li_SrcUntil.append(this.srcUntil.getNodeCreatorDiv());

                                            var li_SrcDoWhile = $('<li class="list-group-item"></li>'); ul.append(li_SrcDoWhile);

                                                var srcDoWhile_className = "DoLoop";
                                                var srcDoWhile_illustration = $("<p>Do...While</p>");
                                                var DoLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoop.js');
                                                var DoLoopTypes = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoopTypes.js');
                                                var srcDoWhile_nodeGenerateFunction = function(){ return new DoLoop(DoLoopTypes.DoWhile) };

                                                this.srcDoWhile = new NodeCreator(srcDoWhile_className, srcDoWhile_illustration, srcDoWhile_nodeGenerateFunction); li_SrcDoWhile.append(this.srcDoWhile.getNodeCreatorDiv());

                                            var li_SrcDoUntil = $('<li class="list-group-item"></li>'); ul.append(li_SrcDoUntil);

                                                var srcDoUntil_className = "DoLoop";
                                                var srcDoUntil_illustration = $("<p>Do...Until</p>");
                                                var DoLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoop.js');
                                                var DoLoopTypes = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoopTypes.js');
                                                var srcDoUntil_nodeGenerateFunction = function(){ return new DoLoop(DoLoopTypes.DoUntil) };

                                                this.srcDoUntil = new NodeCreator(srcDoUntil_className, srcDoUntil_illustration, srcDoUntil_nodeGenerateFunction); li_SrcDoUntil.append(this.srcDoUntil.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatLoops_subProgDecl);


                        var subCatSubProgCalls_subProgDecl = new function() {
                            var NodeCreator = require('./Editor/NodeCreator.js');
                            this.subCatDiv = $('<div class="panel-group"></div>');

                                var pan = $('<div class="panel panel-default"></div>'); this.subCatDiv.append(pan);
                                    var link = $('<a data-toggle="collapse" href="#subProgCallsCollapse_subProgDecl"></a>'); pan.append(link);
                                        var headingPan = $('<div class="panel-heading creation"></div>'); link.append(headingPan);
                                            var title = $('<h4 class="panel-title">Sub-Program Calls</h4>'); headingPan.append(title);
                                    var contentPan = $('<div id="subProgCallsCollapse_subProgDecl" class="panel-collapse collapse"></div>'); pan.append(contentPan);
                                        var ul = $('<ul class="list-group"></ul>'); contentPan.append(ul);
                                            var li_SrcFunctionCall = $('<li class="list-group-item"></li>'); ul.append(li_SrcFunctionCall);

                                                var srcFunctionCall_className = "FunctionCall";
                                                var srcFunctionCall_illustration = $("<p>X <-- Function (...)</p>");
                                                var FunctionCall = require('./Editor/AllNodes/GraphicalNode/FlatNode/SubProgramCalls/FunctionCall.js');
                                                var srcFunctionCall_nodeGenerateFunction = function(){ return new FunctionCall() };

                                                this.srcFunctionCall = new NodeCreator(srcFunctionCall_className, srcFunctionCall_illustration, srcFunctionCall_nodeGenerateFunction); li_SrcFunctionCall.append(this.srcFunctionCall.getNodeCreatorDiv());

                                            var li_SrcProcedureCall = $('<li class="list-group-item"></li>'); ul.append(li_SrcProcedureCall);

                                                var srcProcedureCall_className = "ProcedureCall";
                                                var srcProcedureCall_illustration = $("<p>Procedure (...)</p>");
                                                var ProcedureCall = require('./Editor/AllNodes/GraphicalNode/FlatNode/SubProgramCalls/ProcedureCall.js');
                                                var srcProcedureCall_nodeGenerateFunction = function(){ return new ProcedureCall() };

                                                this.srcProcedureCall = new NodeCreator(srcProcedureCall_className, srcProcedureCall_illustration, srcProcedureCall_nodeGenerateFunction); li_SrcProcedureCall.append(this.srcProcedureCall.getNodeCreatorDiv());

                                            this.getSubCatDiv = function() { return this.subCatDiv; }
                        }
                        this.subCatalogues.push(subCatSubProgCalls_subProgDecl);


                    for(let index=0; index<this.subCatalogues.length; ++index){
                        var currentSubCatDiv = this.subCatalogues[index].getSubCatDiv();
                        currentSubCatDiv.addClass("inlineBlock");
                        this.catBarDiv.append(currentSubCatDiv);
                    }
                    
                    this.getCatBarDiv = function(){ return this.catBarDiv; }
                }

                var subProgDeclCatDiv = this.subProgramDeclarationCatalogue.getCatBarDiv();
                    subProgDeclCatDiv.addClass("tab-pane fade");
                    subProgDeclCatDiv.attr("id","subProgramDeclCat");
                    this.cataloguesBarDiv.append(subProgDeclCatDiv);


                /*this.subProgramsDeclarCatalogue =
                this.recordsDeclarCatalogue = */

                ///////////////////////////////
                ///////////// TABS ////////////

                var ul = $('<ul class="nav nav-tabs"></ul>');
                this.tabsSystemDiv.append(ul);

                    this.li_MainProg = $('<li class="active"><a href="#mainProgram" data-target="#mainProgramPage, #mainProgramCat" data-toggle="tab">Programme Principal</a></li>');
                    ul.append(this.li_MainProg);

                    this.li_SubProgsDeclar = $('<li><a href="#subProgsDeclar" data-target="#subProgramDeclPage, #subProgramDeclCat" data-toggle="tab" >Déclarations de sous-programmes</a></li>');
                    ul.append(this.li_SubProgsDeclar);

                    //this.liRecordsDeclar = $('<li><a data-toggle="tab" href="#recordsDeclar">Déclarations de records</a></li>');
                    //ul.append(this.liRecordsDeclar);


                ////////////////////////////////
                ///////////// PAGES ////////////

                var divPagesContent = $('<div class="tab-content"></div>');
                this.tabsSystemDiv.append(divPagesContent);

                    var mainProgPageDiv = $('<div id="mainProgramPage" class="tab-pane fade in active"></div>');
                    divPagesContent.append(mainProgPageDiv);

                        var Root = require('./Editor/AllNodes/Root.js');
                        this.mainProgRoot = new Root(".SpVariableDeclaration, .ArrayDeclaration, .Assignment, .Read, .Write, .FunctionCall, .ProcedureCall, .SimpleLoop, .DoLoop, .If, .IfElse");
                        mainProgPageDiv.append(this.mainProgRoot.getSurroundingDiv());

                    var subProgDeclPageDiv = $('<div id="subProgramDeclPage" class="tab-pane fade"></div>');
                    divPagesContent.append(subProgDeclPageDiv);

                        var Root = require('./Editor/AllNodes/Root.js');
                        this.subProgDeclRoot = new Root(".FunctionDeclaration, .ProcedureDeclaration");
                        subProgDeclPageDiv.append(this.subProgDeclRoot.getSurroundingDiv());

    }

    stringifyToXmlCurrentDocument() {
        /*fs = require('fs')
        fs.readFile('./XmlHeaderData.xml','utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            var docHeader = $.parseXML(data);
        });*/

        var xmlbuilder = new require('xmlbuilder');
        var documentRootXml = xmlbuilder.create('document',
                                        {version:'1.0', encoding:'UTF-8', standalone:true},
                                        {pubID:null, sysID:null},
                                        {allowSurrogateChars:false, skipNullAttributes:false,
                                         headless:false, ignoreDecorators:false,
                                         separateArrayItems:false, noDoubleEncoding:false,
                                         stringify:{}});
                                         
            documentRootXml.dtd('./XmlHeaderData.dtd');
        
            var pageMainProgXml = xmlbuilder.create('page').att('type',"mainProg");
                var mainProgRootXml = this.mainProgRoot.translateToXml();
                pageMainProgXml.importDocument(mainProgRootXml);
            documentRootXml.importDocument(pageMainProgXml);

            var pageSubProgDeclXml = xmlbuilder.create('page').att('type',"subProgDecl");
                var subProgDeclRootXml = this.subProgDeclRoot.translateToXml();
                pageSubProgDeclXml.importDocument(subProgDeclRootXml);
            documentRootXml.importDocument(pageSubProgDeclXml);
        
        var documentXmlStringified = documentRootXml.end({
            pretty: true,
            indent: '', //'  ',
            newline: '', //'\n',
            allowEmpty: true
        });

        return documentXmlStringified;
    }

    analyzeAndLoad(textDoc) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(textDoc,"text/xml");

        const IncorrectXmlError = require("./Editor/Errors/IncorrectXmlError.js");
        var documentXml = xmlDoc.getElementsByTagName("document")[0];
        if(documentXml == undefined) { throw new IncorrectXmlError("None valid input file"); }

            var mainProgPage = documentXml.childNodes[0];
            if(mainProgPage==undefined || mainProgPage.nodeName!="page" || mainProgPage.attributes[0].name!="type" || mainProgPage.attributes[0].value!="mainProg"){
                throw new IncorrectXmlError("None valid input file");
            }

                var mainProgRoot = mainProgPage.childNodes[0];
                if(mainProgRoot==undefined || mainProgRoot.nodeName!="root" || mainProgRoot.attributes[0].name!="autorisedChildTypes" || mainProgRoot.attributes[0].value!=".SpVariableDeclaration, .ArrayDeclaration, .Assignment, .Read, .Write, .FunctionCall, .ProcedureCall, .SimpleLoop, .DoLoop, .If, .IfElse"){
                    throw new IncorrectXmlError("None valid input file");
                }
                
                //Définition de la chaine de responsabilité
                var Assignment = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/Assignment.js');
                var responsibilityChainHead = Assignment;
                var If = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Conditions/If.js');
                Assignment.nextEntity = If;
                var SimpleLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/SimpleLoop.js');
                If.nextEntity = SimpleLoop;
                var IfElse = require('./Editor/AllNodes/GraphicalNode/SpecialNode/IfElse.js');
                SimpleLoop.nextEntity = IfElse;
                var SpVariableDeclaration = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/SpVariableDeclaration.js');
                IfElse.nextEntity = SpVariableDeclaration;
                var Read = require('./Editor/AllNodes/GraphicalNode/FlatNode/IO/Read.js');
                SpVariableDeclaration.nextEntity = Read;
                var Write = require('./Editor/AllNodes/GraphicalNode/FlatNode/IO/Write.js');
                Read.nextEntity = Write;
                var ArrayDeclaration = require('./Editor/AllNodes/GraphicalNode/FlatNode/Bases/ArrayDeclaration.js');
                Write.nextEntity = ArrayDeclaration;
                var FunctionCall = require('./Editor/AllNodes/GraphicalNode/FlatNode/SubProgramCalls/FunctionCall.js');
                ArrayDeclaration.nextEntity = FunctionCall;
                var ProcedureCall = require('./Editor/AllNodes/GraphicalNode/FlatNode/SubProgramCalls/ProcedureCall.js');
                FunctionCall.nextEntity = ProcedureCall;
                var DoLoop = require('./Editor/AllNodes/GraphicalNode/InclusiveNode/Loops/DoLoop.js');
                ProcedureCall.nextEntity = DoLoop;
                DoLoop.nextEntity = undefined;

                //Je parcours dans le sens inverse (du dernier au premiert) car cela me permet de réutiliser la fonction addFirstChild 
                //que j'ai déjà écrit.
                for(var i=mainProgRoot.childNodes.length-1; i>=0; i--){
                    var currentChildNode = mainProgRoot.childNodes[i];
                    if(currentChildNode != undefined){
                        responsibilityChainHead.analyzeAndLoad(responsibilityChainHead, this.mainProgRoot, currentChildNode);
                    }
                }

    }

}
module.exports = Editor;