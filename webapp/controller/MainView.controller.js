sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("baitcongroup.invoices.controller.MainView", {
            onInit: function () {
                const oJSONModel = new sap.ui.model.json.JSONModel();
                const oView = this.getView();
                oJSONModel.loadData("./model/selectionScreenMenu.json");
                oView.setModel(oJSONModel, "SelectionScreen");
            },

            onFilter: function(oEvent){
                
                const oData = this.getView().getModel("SelectionScreen").getData();
                let filters = []
                if(oData.ShipName !== ""){
                    filters.push(new Filter("ShipName", FilterOperator.Contains, oData.ShipName))
                }
                
                if(oData.CountryKey !== ""){
                    filters.push(new Filter("Country", FilterOperator.EQ, oData.CountryKey))
                }

                const oList = this.getView().byId("invoicesList")
                const oBinding = oList.getBinding("items")
                oBinding.filter(filters)
                
            },

            onClearFilter: function () {
                const oModelSelScreen = this.getView().getModel("SelectionScreen");
                oModelSelScreen.setProperty("/ShipName", "");
                oModelSelScreen.setProperty("/CountryKey", "")
                const oList = this.getView().byId("invoicesList")
                const oBinding = oList.getBinding("items")
                oBinding.filter([])
            }
        });
    });
