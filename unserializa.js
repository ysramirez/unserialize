/*
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the Lesser GNU General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * 2017, Yamir Ramírez, ysramirez@gmail.com
 */
function node(string, value, obj) {
    var flagBeginBracket = string.indexOf("[");
    var flagEndBracket = string.indexOf("]");

    if (flagBeginBracket > -1){
        var root = string.slice(0, flagBeginBracket);
        var index = string.slice(flagBeginBracket+1, flagEndBracket);
        var rest = string.slice(flagEndBracket+1);

		if (typeof obj[root] == 'undefined' ) {
            obj[root] = {};
		}

        if (rest.length == 0) {
            obj[root] = node(index, value, obj[root]);
		} else {
            obj[root] = node(index+rest, value, obj[root]);
		}
    }else {
		obj[string]= decodeURIComponent(value.replace(/\+/g," "));
	}
	return obj;
}

jQuery.unserialize = function(str){
    var obj = {};
    var items = str.split('&');
 		for (var i = 0; i < items.length; i++) {
			var parts = items[i].split(/=/);
			node(parts[0], parts[1], obj);
 		}
	 return obj;
};
