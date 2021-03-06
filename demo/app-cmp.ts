"use strict";
import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { Http, HTTP_PROVIDERS } from "@angular/http";
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder } from "@angular/forms";

import "rxjs/Rx";

import { CompleterCmp, CompleterService, CompleterData, COMPLETER_DATA_PROVIDERS, CompleterItem, RemoteData } from "../src/ng2-completer";
import { CustomData } from "./custom-data";

let template = require("./app-cmp.html");
let style = require("./app-cmp.css");

@Component({
    selector: "demo-app",
    directives: [CompleterCmp, ROUTER_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: template,
    styles: [style],
    providers: [CompleterService, COMPLETER_DATA_PROVIDERS, HTTP_PROVIDERS]
})
export class AppComponent {
    public countries = require("./res/data/countries.json");
    public quotes = [
        {
            qt: "Always forgive your enemies; nothing annoys them so much.",
            nm: "Friedrich Nietzsche"
        },
        {
            qt: "Analyzing humor is like dissecting a frog. Few people are interested and the frog dies of it.",
            nm: "E.B. White"
        },
        {
            qt: "Humor is perhaps a sense of intellectual perspective: an awareness that some things are really important, others not; and that the two kinds are most oddly jumbled in everyday affairs.",
            nm: "Voltaire"
        },
        {
            qt: "I think the next best thing to solving a problem is finding some humor in it.",
            nm: "Frank Howard Clark"
        },
        {
            qt: "Life is tough, and if you have the ability to laugh at it you have the ability to enjoy it.",
            nm: "Salma Hayek"
        },
        {
            qt: "Never be afraid to laugh at yourself. After all, you could be missing out on the joke of the century.",
            nm: "Benjamin Franklin"
        },
        {
            qt: "That is the saving grace of humor. If you fail no one is laughing at you.",
            nm: "William Arthur Ward"
        },
        {
            qt: "The best jokes are dangerous, and dangerous because they are in some way truthful.",
            nm: "Kurt Vonnegut"
        },
        {
            qt: "There’s so much comedy on television. Does that cause comedy in the streets?",
            nm: "Henry Ford"
        },
        {
            qt: "You are not angry with people when you laugh at them. Humor teaches tolerance.",
            nm: "W. Somerset Maugham"
        }
    ];

    private dataService: CompleterData;
    private dataService2: CompleterData;
    private countryName2 = "";
    private quote = "";
    private dataRemote: CompleterData;
    private dataRemote2: RemoteData;
    private dataService3: CompleterData;
    private dataService4: CompleterData;
    private customData: CustomData;
    private searchcb = false;

    constructor(private fb: FormBuilder, private completerService: CompleterService, private http: Http) {
        this.dataService = completerService.local(this.countries, "name", "name").imageField("flag");
        this.dataService2 = completerService.local(this.quotes, "nm", "nm").descriptionField("qt");
        this.dataRemote = completerService.remote(
            "https://raw.githubusercontent.com/oferh/ng2-completer/master/demo/res/data/countries.json?",
            "name",
            "name");
        this.dataRemote2 = completerService.remote(
            null,
            null,
            "formatted_address");
        this.dataRemote2.urlFormater(term => {
            return `https://maps.googleapis.com/maps/api/geocode/json?address=${term}`;
        });
        this.dataRemote2.dataField("results");
        this.dataService3 = completerService.local(this.countries, "name", "name");
        this.dataService4 = completerService.local(this.countries, "name", "name");
        this.customData = new CustomData(http);
    }

    public onCountrySelected(selected: CompleterItem) {
        this.countryName2 = selected.title;
    }

    public onQuoteSelected(selected: CompleterItem) {
        this.quote = selected.description;
    }

}
