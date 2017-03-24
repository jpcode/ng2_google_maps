import {Injectable} from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/zip';

@Injectable()
export class GeoLocationService{

	constructor (private http: Http){}

	getGeoLocation(address: string) : Observable<any>{
		let googleApi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
		let url = [googleApi, '"' + address + '"'].join('');
		return this.http.get( url )
			.map( (res: Response) => {
				var geo = res.json();
				if (geo.status == "OVER_QUERY_LIMIT") {
					throw 'error';
				} 
				return geo;
			})
			.retryWhen(function( times ){
				return Observable.range(1,3).zip( times, function( i ){
					return i;
				}).flatMap( function( i ){
					return Observable.timer( i*500 );
				});
			})
			.catch( (error:any) => Observable.of({}) );
	}
}