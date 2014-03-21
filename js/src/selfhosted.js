





var std_isFinite = isFinite;
var std_isNaN = isNaN;
var std_Array_indexOf = ArrayIndexOf;
var std_Array_iterator = Array.prototype.iterator;
var std_Array_join = Array.prototype.join;
var std_Array_push = Array.prototype.push;
var std_Array_shift = Array.prototype.shift;
var std_Array_slice = Array.prototype.slice;
var std_Array_sort = Array.prototype.sort;
var std_Array_unshift = Array.prototype.unshift;
var std_Boolean_toString = Boolean.prototype.toString;
var Std_Date = Date;
var std_Date_now = Date.now;
var std_Date_valueOf = Date.prototype.valueOf;
var std_Function_bind = Function.prototype.bind;
var std_Function_apply = Function.prototype.apply;
var std_Math_floor = Math.floor;
var std_Math_max = Math.max;
var std_Math_min = Math.min;
var std_Math_imul = Math.imul;
var std_Number_valueOf = Number.prototype.valueOf;
var std_Number_POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
var std_Object_create = Object.create;
var std_Object_defineProperty = Object.defineProperty;
var std_Object_getOwnPropertyNames = Object.getOwnPropertyNames;
var std_Object_hasOwnProperty = Object.prototype.hasOwnProperty;
var std_RegExp_test = RegExp.prototype.test;
var Std_String = String;
var std_String_charCodeAt = String.prototype.charCodeAt;
var std_String_indexOf = String.prototype.indexOf;
var std_String_lastIndexOf = String.prototype.lastIndexOf;
var std_String_match = String.prototype.match;
var std_String_replace = String.prototype.replace;
var std_String_split = String.prototype.split;
var std_String_startsWith = String.prototype.startsWith;
var std_String_substring = String.prototype.substring;
var std_String_toLowerCase = String.prototype.toLowerCase;
var std_String_toUpperCase = String.prototype.toUpperCase;
var std_WeakMap = WeakMap;
var std_WeakMap_get = WeakMap.prototype.get;
var std_WeakMap_has = WeakMap.prototype.has;
var std_WeakMap_set = WeakMap.prototype.set;
var std_Map_has = Map.prototype.has;
var std_Set_has = Set.prototype.has;
var std_iterator = '@@iterator';
var std_StopIteration = StopIteration;
var std_Map_iterator = Map.prototype[std_iterator];
var std_Set_iterator = Set.prototype[std_iterator];
var std_Map_iterator_next = Object.getPrototypeOf(Map()[std_iterator]()).next;
var std_Set_iterator_next = Object.getPrototypeOf(Set()[std_iterator]()).next;





function List() {}
{
  let ListProto = std_Object_create(null);
  ListProto.indexOf = std_Array_indexOf;
  ListProto.join = std_Array_join;
  ListProto.push = std_Array_push;
  ListProto.slice = std_Array_slice;
  ListProto.sort = std_Array_sort;
  MakeConstructible(List, ListProto);
}






function Record() {
    return std_Object_create(null);
}
MakeConstructible(Record, {});






function HasProperty(o, p) {
    return p in o;
}



function ToBoolean(v) {
    return !!v;
}



function ToNumber(v) {
    return +v;
}



function ToString(v) {
                                              ;
    return Std_String(v);
}



function CheckObjectCoercible(v) {
    if (v === undefined || v === null)
        ThrowError(38, ToString(v), "object");
}






function IsObject(v) {




    return (typeof v === "object" && v !== null) ||
           typeof v === "function" ||
           (typeof v === "undefined" && v !== undefined);
}
var wrappersTestMap = new WeakMap();
function testWrappersAllowUseAsKey(o) {
  wrappersTestMap.set(o, o);
  var mappedO = wrappersTestMap.get(o);
  wrappersTestMap.clear();
  return mappedO;
}
function testWrappersForbidAccess(o, operation) {
  try {
    switch (operation) {
      case 'get': var result = o.prop; break;
      case 'set': o.prop2 = 'value'; break;
      case 'call': o(); break;
      case '__proto__':
        Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set.call(o, new Object());
        break;
    }
  } catch (e) {

    return /denied/.test(e);
  }
  return false;
}

MakeWrappable(testWrappersAllowUseAsKey);
MakeWrappable(testWrappersForbidAccess);





function ArrayIndexOf(searchElement ) {

    var O = ToObject(this);


    var len = ((O.length) >>> 0);


    if (len === 0)
        return -1;


    var n = arguments.length > 1 ? ToInteger(arguments[1]) : 0;


    if (n >= len)
        return -1;

    var k;

    if (n >= 0)
        k = n;

    else {

        k = len + n;

        if (k < 0)
            k = 0;
    }


    if (IsPackedArray(O)) {
        for (; k < len; k++) {
            if (O[k] === searchElement)
                return k;
        }
    } else {
        for (; k < len; k++) {
            if (k in O && O[k] === searchElement)
                return k;
        }
    }


    return -1;
}

function ArrayStaticIndexOf(list, searchElement ) {
    if (arguments.length < 1)
        ThrowError(227, 0, 'Array.indexOf');
    var fromIndex = arguments.length > 2 ? arguments[2] : 0;
    return callFunction(ArrayIndexOf, list, searchElement, fromIndex);
}


function ArrayLastIndexOf(searchElement ) {

    var O = ToObject(this);


    var len = ((O.length) >>> 0);


    if (len === 0)
        return -1;


    var n = arguments.length > 1 ? ToInteger(arguments[1]) : len - 1;


    var k;
    if (n > len - 1)
        k = len - 1;
    else if (n < 0)
        k = len + n;
    else
        k = n;


    if (IsPackedArray(O)) {
        for (; k >= 0; k--) {
            if (O[k] === searchElement)
                return k;
        }
    } else {
        for (; k >= 0; k--) {
            if (k in O && O[k] === searchElement)
                return k;
        }
    }


    return -1;
}

function ArrayStaticLastIndexOf(list, searchElement ) {
    if (arguments.length < 1)
        ThrowError(227, 0, 'Array.lastIndexOf');
    var fromIndex;
    if (arguments.length > 2) {
        fromIndex = arguments[2];
    } else {
        var O = ToObject(list);
        var len = ((O.length) >>> 0);
        fromIndex = len - 1;
    }
    return callFunction(ArrayLastIndexOf, list, searchElement, fromIndex);
}


function ArrayEvery(callbackfn ) {

    var O = ToObject(this);


    var len = ((O.length) >>> 0);


    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.every');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));


    var T = arguments.length > 1 ? arguments[1] : void 0;



    for (var k = 0; k < len; k++) {

        if (k in O) {

            if (!callFunction(callbackfn, T, O[k], k, O))
                return false;
        }
    }


    return true;
}

function ArrayStaticEvery(list, callbackfn ) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.every');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    var T = arguments.length > 2 ? arguments[2] : void 0;
    return callFunction(ArrayEvery, list, callbackfn, T);
}


function ArraySome(callbackfn ) {

    var O = ToObject(this);


    var len = ((O.length) >>> 0);


    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.some');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));


    var T = arguments.length > 1 ? arguments[1] : void 0;



    for (var k = 0; k < len; k++) {

        if (k in O) {

            if (callFunction(callbackfn, T, O[k], k, O))
                return true;
        }
    }


    return false;
}

function ArrayStaticSome(list, callbackfn ) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.some');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    var T = arguments.length > 2 ? arguments[2] : void 0;
    return callFunction(ArraySome, list, callbackfn, T);
}


function ArrayForEach(callbackfn ) {

    var O = ToObject(this);


    var len = ((O.length) >>> 0);


    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.forEach');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));


    var T = arguments.length > 1 ? arguments[1] : void 0;



    for (var k = 0; k < len; k++) {

        if (k in O) {

            callFunction(callbackfn, T, O[k], k, O);
        }
    }


    return void 0;
}


function ArrayMap(callbackfn ) {

    var O = ToObject(this);


    var len = ((O.length) >>> 0);


    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.map');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));


    var T = arguments.length > 1 ? arguments[1] : void 0;


    var A = NewDenseArray(len);



    for (var k = 0; k < len; k++) {

        if (k in O) {

            var mappedValue = callFunction(callbackfn, T, O[k], k, O);

            UnsafePutElements(A, k, mappedValue);
        }
    }


    return A;
}

function ArrayStaticMap(list, callbackfn ) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.map');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    var T = arguments.length > 2 ? arguments[2] : void 0;
    return callFunction(ArrayMap, list, callbackfn, T);
}

function ArrayStaticForEach(list, callbackfn ) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.forEach');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    var T = arguments.length > 2 ? arguments[2] : void 0;
    callFunction(ArrayForEach, list, callbackfn, T);
}


function ArrayReduce(callbackfn ) {

    var O = ToObject(this);


    var len = ((O.length) >>> 0);


    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.reduce');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));


    var k = 0;


    var accumulator;
    if (arguments.length > 1) {
        accumulator = arguments[1];
    } else {

        if (len === 0)
            ThrowError(218);
        if (IsPackedArray(O)) {
            accumulator = O[k++];
        } else {
            var kPresent = false;
            for (; k < len; k++) {
                if (k in O) {
                    accumulator = O[k];
                    kPresent = true;
                    k++;
                    break;
                }
            }
            if (!kPresent)
              ThrowError(218);
        }
    }



    for (; k < len; k++) {

        if (k in O) {

            accumulator = callbackfn(accumulator, O[k], k, O);
        }
    }


    return accumulator;
}

function ArrayStaticReduce(list, callbackfn) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.reduce');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    if (arguments.length > 2)
        return callFunction(ArrayReduce, list, callbackfn, arguments[2]);
    else
        return callFunction(ArrayReduce, list, callbackfn);
}


function ArrayReduceRight(callbackfn ) {

    var O = ToObject(this);


    var len = ((O.length) >>> 0);


    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.reduce');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));


    var k = len - 1;


    var accumulator;
    if (arguments.length > 1) {
        accumulator = arguments[1];
    } else {

        if (len === 0)
            ThrowError(218);
        if (IsPackedArray(O)) {
            accumulator = O[k--];
        } else {
            var kPresent = false;
            for (; k >= 0; k--) {
                if (k in O) {
                    accumulator = O[k];
                    kPresent = true;
                    k--;
                    break;
                }
            }
            if (!kPresent)
                ThrowError(218);
        }
    }



    for (; k >= 0; k--) {

        if (k in O) {

            accumulator = callbackfn(accumulator, O[k], k, O);
        }
    }


    return accumulator;
}

function ArrayStaticReduceRight(list, callbackfn) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.reduceRight');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    if (arguments.length > 2)
        return callFunction(ArrayReduceRight, list, callbackfn, arguments[2]);
    else
        return callFunction(ArrayReduceRight, list, callbackfn);
}


function ArrayFind(predicate ) {

    var O = ToObject(this);


    var len = ToInteger(O.length);


    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.find');
    if (!IsCallable(predicate))
        ThrowError(22, DecompileArg(0, predicate));


    var T = arguments.length > 1 ? arguments[1] : undefined;
    for (var k = 0; k < len; k++) {

        if (k in O) {

            var kValue = O[k];
            if (callFunction(predicate, T, kValue, k, O))
                return kValue;
        }
    }


    return undefined;
}


function ArrayFindIndex(predicate ) {

    var O = ToObject(this);


    var len = ToInteger(O.length);


    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.find');
    if (!IsCallable(predicate))
        ThrowError(22, DecompileArg(0, predicate));


    var T = arguments.length > 1 ? arguments[1] : undefined;
    for (var k = 0; k < len; k++) {

        if (k in O) {

            if (callFunction(predicate, T, O[k], k, O))
                return k;
        }
    }


    return -1;
}
function CreateArrayIterator(obj, kind) {
    var iteratedObject = ToObject(obj);
    var iterator = NewArrayIterator();
    UnsafeSetReservedSlot(iterator, 0, iteratedObject);
    UnsafeSetReservedSlot(iterator, 1, 0);
    UnsafeSetReservedSlot(iterator, 2, kind);
    return iterator;
}

function ArrayIteratorIdentity() {
    return this;
}

function ArrayIteratorNext() {

    if (!IsObject(this) || !IsArrayIterator(this))
        ThrowError(188, "ArrayIterator", "next", ToString(this));

    var a = UnsafeGetReservedSlot(this, 0);
    var index = UnsafeGetReservedSlot(this, 1);
    var itemKind = UnsafeGetReservedSlot(this, 2);


    if (index >= ((a.length) >>> 0)) {


        UnsafeSetReservedSlot(this, 1, 0xffffffff);
        return { value: undefined, done: true };
    }

    UnsafeSetReservedSlot(this, 1, index + 1);

    if (itemKind === 0)
        return { value: a[index], done: false };

    if (itemKind === 1) {
        var pair = NewDenseArray(2);
        pair[0] = index;
        pair[1] = a[index];
        return { value: pair, done : false };
    }

                                                ;
    return { value: index, done: false };
}

function ArrayValues() {
    return CreateArrayIterator(this, 0);
}

function ArrayEntries() {
    return CreateArrayIterator(this, 1);
}

function ArrayKeys() {
    return CreateArrayIterator(this, 2);
}
function ComputeNumChunks(length) {
  var chunks = length >>> 5;
  if (chunks << 5 === length)
    return chunks;
  return chunks + 1;
}







function ComputeSliceBounds(numItems, sliceIndex, numSlices) {
  var sliceWidth = (numItems / numSlices) | 0;
  var extraChunks = (numItems % numSlices) | 0;

  var startIndex = sliceWidth * sliceIndex + std_Math_min(extraChunks, sliceIndex);
  var endIndex = startIndex + sliceWidth;
  if (sliceIndex < extraChunks)
    endIndex += 1;
  return [startIndex, endIndex];
}
function ComputeAllSliceBounds(numItems, numSlices) {

  var sliceWidth = (numItems / numSlices) | 0;
  var extraChunks = (numItems % numSlices) | 0;
  var counter = 0;
  var info = [];
  var i = 0;
  for (; i < extraChunks; i++) {
    callFunction(std_Array_push, info, counter, counter + sliceWidth + 1, counter, 0);;
    counter += sliceWidth + 1;
  }
  for (; i < numSlices; i++) {
    callFunction(std_Array_push, info, counter, counter + sliceWidth, counter, 0);;
    counter += sliceWidth;
  }
  return info;
}







var dateTimeFormatCache = new Record();
function Date_toLocaleString() {

    var x = callFunction(std_Date_valueOf, this);
    if (std_isNaN(x))
        return "Invalid Date";


    var locales = arguments.length > 0 ? arguments[0] : undefined;
    var options = arguments.length > 1 ? arguments[1] : undefined;


    var dateTimeFormat;
    if (locales === undefined && options === undefined) {


        if (dateTimeFormatCache.dateTimeFormat === undefined) {
            options = ToDateTimeOptions(options, "any", "all");
            dateTimeFormatCache.dateTimeFormat = intl_DateTimeFormat(locales, options);
        }
        dateTimeFormat = dateTimeFormatCache.dateTimeFormat;
    } else {
        options = ToDateTimeOptions(options, "any", "all");
        dateTimeFormat = intl_DateTimeFormat(locales, options);
    }


    return intl_FormatDateTime(dateTimeFormat, x);
}
function Date_toLocaleDateString() {

    var x = callFunction(std_Date_valueOf, this);
    if (std_isNaN(x))
        return "Invalid Date";


    var locales = arguments.length > 0 ? arguments[0] : undefined;
    var options = arguments.length > 1 ? arguments[1] : undefined;


    var dateTimeFormat;
    if (locales === undefined && options === undefined) {


        if (dateTimeFormatCache.dateFormat === undefined) {
            options = ToDateTimeOptions(options, "date", "date");
            dateTimeFormatCache.dateFormat = intl_DateTimeFormat(locales, options);
        }
        dateTimeFormat = dateTimeFormatCache.dateFormat;
    } else {
        options = ToDateTimeOptions(options, "date", "date");
        dateTimeFormat = intl_DateTimeFormat(locales, options);
    }


    return intl_FormatDateTime(dateTimeFormat, x);
}
function Date_toLocaleTimeString() {

    var x = callFunction(std_Date_valueOf, this);
    if (std_isNaN(x))
        return "Invalid Date";


    var locales = arguments.length > 0 ? arguments[0] : undefined;
    var options = arguments.length > 1 ? arguments[1] : undefined;


    var dateTimeFormat;
    if (locales === undefined && options === undefined) {


        if (dateTimeFormatCache.timeFormat === undefined) {
            options = ToDateTimeOptions(options, "time", "time");
            dateTimeFormatCache.timeFormat = intl_DateTimeFormat(locales, options);
        }
        dateTimeFormat = dateTimeFormatCache.timeFormat;
    } else {
        options = ToDateTimeOptions(options, "time", "time");
        dateTimeFormat = intl_DateTimeFormat(locales, options);
    }


    return intl_FormatDateTime(dateTimeFormat, x);
}
function toASCIIUpperCase(s) {
                                                     ;




    var result = "";
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if ("a" <= c && c <= "z")
            c = callFunction(std_String_toUpperCase, c);
        result += c;
    }
    return result;
}
var unicodeLocaleExtensionSequence = "-u(-[a-z0-9]{2,8})+";
var unicodeLocaleExtensionSequenceRE = new RegExp(unicodeLocaleExtensionSequence);





function removeUnicodeExtensions(locale) {


    var extensions;
    while ((extensions = regexp_exec_no_statics(unicodeLocaleExtensionSequenceRE, locale)) !== null) {
        locale = callFunction(std_String_replace, locale, extensions[0], "");
        unicodeLocaleExtensionSequenceRE.lastIndex = 0;
    }
    return locale;
}







var languageTagRE = (function () {


    var ALPHA = "[a-zA-Z]";


    var DIGIT = "[0-9]";



    var alphanum = "(?:" + ALPHA + "|" + DIGIT + ")";
    var regular = "(?:art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)";
    var irregular = "(?:en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)";


    var grandfathered = "(?:" + irregular + "|" + regular + ")";

    var privateuse = "(?:x(?:-[a-z0-9]{1,8})+)";





    var singleton = "(?:" + DIGIT + "|[A-WY-Za-wy-z])";

    var extension = "(?:" + singleton + "(?:-" + alphanum + "{2,8})+)";


    var variant = "(?:" + alphanum + "{5,8}|(?:" + DIGIT + alphanum + "{3}))";


    var region = "(?:" + ALPHA + "{2}|" + DIGIT + "{3})";

    var script = "(?:" + ALPHA + "{4})";


    var extlang = "(?:" + ALPHA + "{3}(?:-" + ALPHA + "{3}){0,2})";





    var language = "(?:" + ALPHA + "{2,3}(?:-" + extlang + ")?|" + ALPHA + "{4}|" + ALPHA + "{5,8})";






    var langtag = language + "(?:-" + script + ")?(?:-" + region + ")?(?:-" +
                  variant + ")*(?:-" + extension + ")*(?:-" + privateuse + ")?";



    var languageTag = "^(?:" + langtag + "|" + privateuse + "|" + grandfathered + ")$";


    return new RegExp(languageTag, "i");
}());


var duplicateVariantRE = (function () {


    var ALPHA = "[a-zA-Z]";


    var DIGIT = "[0-9]";



    var alphanum = "(?:" + ALPHA + "|" + DIGIT + ")";


    var variant = "(?:" + alphanum + "{5,8}|(?:" + DIGIT + alphanum + "{3}))";


    var duplicateVariant =



        "(?:" + alphanum + "{2,8}-)+" +

        "(" + variant + ")-" +


        "(?:" + alphanum + "{2,8}-)*" +

        "\\1" +


        "(?!" + alphanum + ")";




    return new RegExp(duplicateVariant);
}());


var duplicateSingletonRE = (function () {


    var ALPHA = "[a-zA-Z]";


    var DIGIT = "[0-9]";



    var alphanum = "(?:" + ALPHA + "|" + DIGIT + ")";





    var singleton = "(?:" + DIGIT + "|[A-WY-Za-wy-z])";


    var duplicateSingleton =


        "-(" + singleton + ")-" +

        "(?:" + alphanum + "+-)*" +

        "\\1" +


        "(?!" + alphanum + ")";




    return new RegExp(duplicateSingleton);
}());
function IsStructurallyValidLanguageTag(locale) {
                                                                        ;
    if (!regexp_test_no_statics(languageTagRE, locale))
        return false;




    if (callFunction(std_String_startsWith, locale, "x-"))
        return true;
    var pos = callFunction(std_String_indexOf, locale, "-x-");
    if (pos !== -1)
        locale = callFunction(std_String_substring, locale, 0, pos);


    return !regexp_test_no_statics(duplicateVariantRE, locale) &&
           !regexp_test_no_statics(duplicateSingletonRE, locale);
}
function CanonicalizeLanguageTag(locale) {
                                                                             ;
    locale = callFunction(std_String_toLowerCase, locale);


    if (callFunction(std_Object_hasOwnProperty, langTagMappings, locale))
        return langTagMappings[locale];

    var subtags = callFunction(std_String_split, locale, "-");
    var i = 0;



    while (i < subtags.length) {
        var subtag = subtags[i];






        if (subtag.length === 1 && (i > 0 || subtag === "x"))
            break;

        if (subtag.length === 4) {


            subtag = callFunction(std_String_toUpperCase, subtag[0]) +
                     callFunction(std_String_substring, subtag, 1);
        } else if (i !== 0 && subtag.length === 2) {


            subtag = callFunction(std_String_toUpperCase, subtag);
        }
        if (callFunction(std_Object_hasOwnProperty, langSubtagMappings, subtag)) {
            subtag = langSubtagMappings[subtag];
        } else if (callFunction(std_Object_hasOwnProperty, extlangMappings, subtag)) {





            subtag = extlangMappings[subtag].preferred;
            if (i === 1 && extlangMappings[subtag].prefix === subtags[0]) {
                callFunction(std_Array_shift, subtags);
                i--;
            }
        }
        subtags[i] = subtag;
        i++;
    }
    var normal = callFunction(std_Array_join, callFunction(std_Array_slice, subtags, 0, i), "-");



    var extensions = new List();
    while (i < subtags.length && subtags[i] !== "x") {
        var extensionStart = i;
        i++;
        while (i < subtags.length && subtags[i].length > 1)
            i++;
        var extension = callFunction(std_Array_join, callFunction(std_Array_slice, subtags, extensionStart, i), "-");
        extensions.push(extension);
    }
    extensions.sort();


    var privateUse = "";
    if (i < subtags.length)
        privateUse = callFunction(std_Array_join, callFunction(std_Array_slice, subtags, i), "-");


    var canonical = normal;
    if (extensions.length > 0)
        canonical += "-" + extensions.join("-");
    if (privateUse.length > 0) {

        if (canonical.length > 0)
            canonical += "-" + privateUse;
        else
            canonical = privateUse;
    }

    return canonical;
}




var oldStyleLanguageTagMappings = {
    "pa-PK": "pa-Arab-PK",
    "zh-CN": "zh-Hans-CN",
    "zh-HK": "zh-Hant-HK",
    "zh-SG": "zh-Hans-SG",
    "zh-TW": "zh-Hant-TW"
};







function DefaultLocale() {





    var localeOfLastResort = "en-GB";

    var locale = RuntimeDefaultLocale();
    if (!IsStructurallyValidLanguageTag(locale))
        return localeOfLastResort;

    locale = CanonicalizeLanguageTag(locale);
    if (callFunction(std_Object_hasOwnProperty, oldStyleLanguageTagMappings, locale))
        locale = oldStyleLanguageTagMappings[locale];

    if (!(collatorInternalProperties.availableLocales()[locale] &&
          numberFormatInternalProperties.availableLocales()[locale] &&
          dateTimeFormatInternalProperties.availableLocales()[locale]))
    {
        locale = localeOfLastResort;
    }
    return locale;
}







function IsWellFormedCurrencyCode(currency) {
    var c = ToString(currency);
    var normalized = toASCIIUpperCase(c);
    if (normalized.length !== 3)
        return false;
    return !regexp_test_no_statics(/[^A-Z]/, normalized);
}
function addOldStyleLanguageTags(availableLocales) {
    var oldStyleLocales = std_Object_getOwnPropertyNames(oldStyleLanguageTagMappings);
    for (var i = 0; i < oldStyleLocales.length; i++) {
        var oldStyleLocale = oldStyleLocales[i];
        if (availableLocales[oldStyleLanguageTagMappings[oldStyleLocale]])
            availableLocales[oldStyleLocale] = true;
    }
    return availableLocales;
}







function CanonicalizeLocaleList(locales) {
    if (locales === undefined)
        return new List();
    var seen = new List();
    if (typeof locales === "string")
        locales = [locales];
    var O = ToObject(locales);
    var len = ((O.length) >>> 0);
    var k = 0;
    while (k < len) {

        var kPresent = HasProperty(O, k);
        if (kPresent) {
            var kValue = O[k];
            if (!(typeof kValue === "string" || IsObject(kValue)))
                ThrowError(328);
            var tag = ToString(kValue);
            if (!IsStructurallyValidLanguageTag(tag))
                ThrowError(329, tag);
            tag = CanonicalizeLanguageTag(tag);
            if (seen.indexOf(tag) === -1)
                seen.push(tag);
        }
        k++;
    }
    return seen;
}
function BestAvailableLocale(availableLocales, locale) {
                                                                                                  ;
                                                                                                  ;
                                                                                                  ;

    var candidate = locale;
    while (true) {
        if (availableLocales[candidate])
            return candidate;
        var pos = callFunction(std_String_lastIndexOf, candidate, "-");
        if (pos === -1)
            return undefined;
        if (pos >= 2 && candidate[pos - 2] === "-")
            pos -= 2;
        candidate = callFunction(std_String_substring, candidate, 0, pos);
    }
}
function LookupMatcher(availableLocales, requestedLocales) {
    var i = 0;
    var len = requestedLocales.length;
    var availableLocale;
    var locale, noExtensionsLocale;
    while (i < len && availableLocale === undefined) {
        locale = requestedLocales[i];
        noExtensionsLocale = removeUnicodeExtensions(locale);
        availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
        i++;
    }

    var result = new Record();
    if (availableLocale !== undefined) {
        result.locale = availableLocale;
        if (locale !== noExtensionsLocale) {
            var extensionMatch = regexp_exec_no_statics(unicodeLocaleExtensionSequenceRE, locale);
            var extension = extensionMatch[0];
            var extensionIndex = extensionMatch.index;
            result.extension = extension;
            result.extensionIndex = extensionIndex;
        }
    } else {
        result.locale = DefaultLocale();
    }
    return result;
}
function BestFitMatcher(availableLocales, requestedLocales) {

    return LookupMatcher(availableLocales, requestedLocales);
}
function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {



    var matcher = options.localeMatcher;
    var r = (matcher === "lookup")
            ? LookupMatcher(availableLocales, requestedLocales)
            : BestFitMatcher(availableLocales, requestedLocales);


    var foundLocale = r.locale;


    var extension = r.extension;
    var extensionIndex, extensionSubtags, extensionSubtagsLength;


    if (extension !== undefined) {

        extensionIndex = r.extensionIndex;


        extensionSubtags = callFunction(std_String_split, extension, "-");
        extensionSubtagsLength = extensionSubtags.length;
    }


    var result = new Record();
    result.dataLocale = foundLocale;


    var supportedExtension = "-u";


    var i = 0;
    var len = relevantExtensionKeys.length;
    while (i < len) {

        var key = relevantExtensionKeys[i];


        var foundLocaleData = localeData(foundLocale);
        var keyLocaleData = foundLocaleData[key];



        var value = keyLocaleData[0];




        var supportedExtensionAddition = "";



        var valuePos;


        if (extensionSubtags !== undefined) {

            var keyPos = callFunction(std_Array_indexOf, extensionSubtags, key);


            if (keyPos !== -1) {

                if (keyPos + 1 < extensionSubtagsLength &&
                    extensionSubtags[keyPos + 1].length > 2)
                {

                    var requestedValue = extensionSubtags[keyPos + 1];


                    valuePos = callFunction(std_Array_indexOf, keyLocaleData, requestedValue);


                    if (valuePos !== -1) {
                        value = requestedValue;
                        supportedExtensionAddition = "-" + key + "-" + value;
                    }
                } else {






                    valuePos = callFunction(std_Array_indexOf, keyLocaleData, "true");


                    if (valuePos !== -1)
                        value = "true";
                }
            }
        }




        var optionsValue = options[key];


        if (optionsValue !== undefined &&
            callFunction(std_Array_indexOf, keyLocaleData, optionsValue) !== -1)
        {

            if (optionsValue !== value) {
                value = optionsValue;
                supportedExtensionAddition = "";
            }
        }


        result[key] = value;
        supportedExtension += supportedExtensionAddition;
        i++;
    }


    if (supportedExtension.length > 2) {
        var preExtension = callFunction(std_String_substring, foundLocale, 0, extensionIndex);
        var postExtension = callFunction(std_String_substring, foundLocale, extensionIndex);
        foundLocale = preExtension + supportedExtension + postExtension;
    }


    result.locale = foundLocale;
    return result;
}
function LookupSupportedLocales(availableLocales, requestedLocales) {

    var len = requestedLocales.length;
    var subset = new List();


    var k = 0;
    while (k < len) {

        var locale = requestedLocales[k];
        var noExtensionsLocale = removeUnicodeExtensions(locale);


        var availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
        if (availableLocale !== undefined)
            subset.push(locale);


        k++;
    }


    return subset.slice(0);
}
function BestFitSupportedLocales(availableLocales, requestedLocales) {

    return LookupSupportedLocales(availableLocales, requestedLocales);
}
function SupportedLocales(availableLocales, requestedLocales, options) {



    var matcher;
    if (options !== undefined) {

        options = ToObject(options);
        matcher = options.localeMatcher;


        if (matcher !== undefined) {
            matcher = ToString(matcher);
            if (matcher !== "lookup" && matcher !== "best fit")
                ThrowError(330, matcher);
        }
    }


    var subset = (matcher === undefined || matcher === "best fit")
                 ? BestFitSupportedLocales(availableLocales, requestedLocales)
                 : LookupSupportedLocales(availableLocales, requestedLocales);


    for (var i = 0; i < subset.length; i++)
        std_Object_defineProperty(subset, i, {value: subset[i], writable: false, enumerable: true, configurable: false});
    std_Object_defineProperty(subset, "length", {value: subset.length, writable: false, enumerable: false, configurable: false});


    return subset;
}
function GetOption(options, property, type, values, fallback) {

    var value = options[property];


    if (value !== undefined) {

        if (type === "boolean")
            value = ToBoolean(value);
        else if (type === "string")
            value = ToString(value);
        else
                                      ;


        if (values !== undefined && callFunction(std_Array_indexOf, values, value) === -1)
            ThrowError(331, property, value);


        return value;
    }


    return fallback;
}
function GetNumberOption(options, property, minimum, maximum, fallback) {
                                                          ;
                                                          ;
                                                                                                     ;


    var value = options[property];


    if (value !== undefined) {
        value = ToNumber(value);
        if (std_isNaN(value) || value < minimum || value > maximum)
            ThrowError(332, value);
        return std_Math_floor(value);
    }


    return fallback;
}
function defineProperty(o, p, v) {
    std_Object_defineProperty(o, p, {value: v, writable: true, enumerable: true, configurable: true});
}
var internalsMap = new WeakMap();





function initializeIntlObject(obj) {
                                                                      ;




    var internals = std_Object_create(null);
    internals.type = "partial";
    internals.lazyData = null;
    internals.internalProps = null;

    callFunction(std_WeakMap_set, internalsMap, obj, internals);
    return internals;
}





function setLazyData(internals, type, lazyData)
{
                                                                                          ;
                                                                                                  ;
                                                      ;


    internals.lazyData = lazyData;
    internals.type = type;
}






function setInternalProperties(internals, internalProps)
{
                                                                                           ;
                                                                        ;
                                                                                 ;


    internals.internalProps = internalProps;
    internals.lazyData = null;
}






function maybeInternalProperties(internals)
{
                                                                               ;
                                                                                                                                 ;
    var lazyData = internals.lazyData;
    if (lazyData)
        return null;
                                                                                         ;
    return internals.internalProps;
}





function isInitializedIntlObject(obj) {
    return callFunction(std_WeakMap_has, internalsMap, obj);
}
function getIntlObjectInternals(obj, className, methodName) {
                                                                                     ;

    var internals = callFunction(std_WeakMap_get, internalsMap, obj);
                                                                                                  ;

    if (internals === undefined || internals.type !== className)
        ThrowError(327, className, methodName, className);

    return internals;
}






function getInternals(obj)
{
                                                                                   ;

    var internals = callFunction(std_WeakMap_get, internalsMap, obj);

                                                                                   ;
    var lazyData = internals.lazyData;
    if (!lazyData)
        return internals.internalProps;

    var internalProps;
    var type = internals.type;
    if (type === "Collator")
        internalProps = resolveCollatorInternals(lazyData)
    else if (type === "DateTimeFormat")
        internalProps = resolveDateTimeFormatInternals(lazyData)
    else
        internalProps = resolveNumberFormatInternals(lazyData);
    setInternalProperties(internals, internalProps);
    return internalProps;
}
var collatorKeyMappings = {
    kn: {property: "numeric", type: "boolean"},
    kf: {property: "caseFirst", type: "string", values: ["upper", "lower", "false"]}
};





function resolveCollatorInternals(lazyCollatorData)
{
                                                                  ;

    var internalProps = std_Object_create(null);


    internalProps.usage = lazyCollatorData.usage;


    var Collator = collatorInternalProperties;


    var collatorIsSorting = lazyCollatorData.usage === "sort";
    var localeData = collatorIsSorting
                     ? Collator.sortLocaleData
                     : Collator.searchLocaleData;



    var relevantExtensionKeys = Collator.relevantExtensionKeys;


    var r = ResolveLocale(Collator.availableLocales(),
                          lazyCollatorData.requestedLocales,
                          lazyCollatorData.opt,
                          relevantExtensionKeys,
                          localeData);


    internalProps.locale = r.locale;


    var key, property, value, mapping;
    var i = 0, len = relevantExtensionKeys.length;
    while (i < len) {

        key = relevantExtensionKeys[i];
        if (key === "co") {

            property = "collation";
            value = r.co === null ? "default" : r.co;
        } else {

            mapping = collatorKeyMappings[key];
            property = mapping.property;
            value = r[key];
            if (mapping.type === "boolean")
                value = value === "true";
        }


        internalProps[property] = value;


        i++;
    }



    var s = lazyCollatorData.rawSensitivity;
    if (s === undefined) {
        if (collatorIsSorting) {

            s = "variant";
        } else {

            var dataLocale = r.dataLocale;
            var dataLocaleData = localeData(dataLocale);
            s = dataLocaleData.sensitivity;
        }
    }
    internalProps.sensitivity = s;


    internalProps.ignorePunctuation = lazyCollatorData.ignorePunctuation;


    internalProps.boundFormat = undefined;



    return internalProps;
}






function getCollatorInternals(obj, methodName) {
    var internals = getIntlObjectInternals(obj, "Collator", methodName);
                                                                                    ;


    var internalProps = maybeInternalProperties(internals);
    if (internalProps)
        return internalProps;


    internalProps = resolveCollatorInternals(internals.lazyData);
    setInternalProperties(internals, internalProps);
    return internalProps;
}
function InitializeCollator(collator, locales, options) {
                                                    ;


    if (isInitializedIntlObject(collator))
        ThrowError(333);


    var internals = initializeIntlObject(collator);
    var lazyCollatorData = std_Object_create(null);


    var requestedLocales = CanonicalizeLocaleList(locales);
    lazyCollatorData.requestedLocales = requestedLocales;
    if (options === undefined)
        options = {};
    else
        options = ToObject(options);



    var u = GetOption(options, "usage", "string", ["sort", "search"], "sort");
    lazyCollatorData.usage = u;


    var opt = new Record();
    lazyCollatorData.opt = opt;


    var matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
    opt.localeMatcher = matcher;


    var numericValue = GetOption(options, "numeric", "boolean", undefined, undefined);
    if (numericValue !== undefined)
        numericValue = callFunction(std_Boolean_toString, numericValue);
    opt.kn = numericValue;

    var caseFirstValue = GetOption(options, "caseFirst", "string", ["upper", "lower", "false"], undefined);
    opt.kf = caseFirstValue;



    var s = GetOption(options, "sensitivity", "string",
                      ["base", "accent", "case", "variant"], undefined);
    lazyCollatorData.rawSensitivity = s;


    var ip = GetOption(options, "ignorePunctuation", "boolean", undefined, false);
    lazyCollatorData.ignorePunctuation = ip;





    setLazyData(internals, "Collator", lazyCollatorData);
}
function Intl_Collator_supportedLocalesOf(locales ) {
    var options = arguments.length > 1 ? arguments[1] : undefined;

    var availableLocales = collatorInternalProperties.availableLocales();
    var requestedLocales = CanonicalizeLocaleList(locales);
    return SupportedLocales(availableLocales, requestedLocales, options);
}







var collatorInternalProperties = {
    sortLocaleData: collatorSortLocaleData,
    searchLocaleData: collatorSearchLocaleData,
    _availableLocales: null,
    availableLocales: function()
    {
        var locales = this._availableLocales;
        if (locales)
            return locales;
        return (this._availableLocales =
          addOldStyleLanguageTags(intl_Collator_availableLocales()));
    },
    relevantExtensionKeys: ["co", "kn"]
};


function collatorSortLocaleData(locale) {
    var collations = intl_availableCollations(locale);
    callFunction(std_Array_unshift, collations, null);
    return {
        co: collations,
        kn: ["false", "true"]
    };
}


function collatorSearchLocaleData(locale) {
    return {
        co: [null],
        kn: ["false", "true"],


        sensitivity: "variant"
    };
}







function collatorCompareToBind(x, y) {




    var X = ToString(x);
    var Y = ToString(y);
    return intl_CompareStrings(this, X, Y);
}
function Intl_Collator_compare_get() {

    var internals = getCollatorInternals(this, "compare");


    if (internals.boundCompare === undefined) {

        var F = collatorCompareToBind;


        var bc = callFunction(std_Function_bind, F, this);
        internals.boundCompare = bc;
    }


    return internals.boundCompare;
}







function Intl_Collator_resolvedOptions() {

    var internals = getCollatorInternals(this, "resolvedOptions");

    var result = {
        locale: internals.locale,
        usage: internals.usage,
        sensitivity: internals.sensitivity,
        ignorePunctuation: internals.ignorePunctuation
    };

    var relevantExtensionKeys = collatorInternalProperties.relevantExtensionKeys;
    for (var i = 0; i < relevantExtensionKeys.length; i++) {
        var key = relevantExtensionKeys[i];
        var property = (key === "co") ? "collation" : collatorKeyMappings[key].property;
        defineProperty(result, property, internals[property]);
    }
    return result;
}
var numberFormatInternalProperties = {
    localeData: numberFormatLocaleData,
    _availableLocales: null,
    availableLocales: function()
    {
        var locales = this._availableLocales;
        if (locales)
            return locales;
        return (this._availableLocales =
          addOldStyleLanguageTags(intl_NumberFormat_availableLocales()));
    },
    relevantExtensionKeys: ["nu"]
};





function resolveNumberFormatInternals(lazyNumberFormatData) {
                                                                      ;

    var internalProps = std_Object_create(null);


    var requestedLocales = lazyNumberFormatData.requestedLocales;



    var opt = lazyNumberFormatData.opt;



    var NumberFormat = numberFormatInternalProperties;


    var localeData = NumberFormat.localeData;


    var r = ResolveLocale(NumberFormat.availableLocales(),
                          lazyNumberFormatData.requestedLocales,
                          lazyNumberFormatData.opt,
                          NumberFormat.relevantExtensionKeys,
                          localeData);


    internalProps.locale = r.locale;
    internalProps.numberingSystem = r.nu;



    var s = lazyNumberFormatData.style;
    internalProps.style = s;


    if (s === "currency") {
        internalProps.currency = lazyNumberFormatData.currency;
        internalProps.currencyDisplay = lazyNumberFormatData.currencyDisplay;
    }


    internalProps.minimumIntegerDigits = lazyNumberFormatData.minimumIntegerDigits;


    internalProps.minimumFractionDigits = lazyNumberFormatData.minimumFractionDigits;


    internalProps.maximumFractionDigits = lazyNumberFormatData.maximumFractionDigits;


    if ("minimumSignificantDigits" in lazyNumberFormatData) {


                                                                                                 ;
        internalProps.minimumSignificantDigits = lazyNumberFormatData.minimumSignificantDigits;
        internalProps.maximumSignificantDigits = lazyNumberFormatData.maximumSignificantDigits;
    }


    internalProps.useGrouping = lazyNumberFormatData.useGrouping;


    internalProps.boundFormat = undefined;



    return internalProps;
}






function getNumberFormatInternals(obj, methodName) {
    var internals = getIntlObjectInternals(obj, "NumberFormat", methodName);
                                                                                        ;


    var internalProps = maybeInternalProperties(internals);
    if (internalProps)
        return internalProps;


    internalProps = resolveNumberFormatInternals(internals.lazyData);
    setInternalProperties(internals, internalProps);
    return internalProps;
}
function InitializeNumberFormat(numberFormat, locales, options) {
                                                            ;


    if (isInitializedIntlObject(numberFormat))
        ThrowError(333);


    var internals = initializeIntlObject(numberFormat);
    var lazyNumberFormatData = std_Object_create(null);


    var requestedLocales = CanonicalizeLocaleList(locales);
    lazyNumberFormatData.requestedLocales = requestedLocales;
    if (options === undefined)
        options = {};
    else
        options = ToObject(options);



    var opt = new Record();
    lazyNumberFormatData.opt = opt;


    var matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
    opt.localeMatcher = matcher;



    var s = GetOption(options, "style", "string", ["decimal", "percent", "currency"], "decimal");
    lazyNumberFormatData.style = s;


    var c = GetOption(options, "currency", "string", undefined, undefined);
    if (c !== undefined && !IsWellFormedCurrencyCode(c))
        ThrowError(334, c);
    var cDigits;
    if (s === "currency") {
        if (c === undefined)
            ThrowError(335);


        c = toASCIIUpperCase(c);
        lazyNumberFormatData.currency = c;
        cDigits = CurrencyDigits(c);
    }


    var cd = GetOption(options, "currencyDisplay", "string", ["code", "symbol", "name"], "symbol");
    if (s === "currency")
        lazyNumberFormatData.currencyDisplay = cd;


    var mnid = GetNumberOption(options, "minimumIntegerDigits", 1, 21, 1);
    lazyNumberFormatData.minimumIntegerDigits = mnid;


    var mnfdDefault = (s === "currency") ? cDigits : 0;
    var mnfd = GetNumberOption(options, "minimumFractionDigits", 0, 20, mnfdDefault);
    lazyNumberFormatData.minimumFractionDigits = mnfd;


    var mxfdDefault;
    if (s === "currency")
        mxfdDefault = std_Math_max(mnfd, cDigits);
    else if (s === "percent")
        mxfdDefault = std_Math_max(mnfd, 0);
    else
        mxfdDefault = std_Math_max(mnfd, 3);
    var mxfd = GetNumberOption(options, "maximumFractionDigits", mnfd, 20, mxfdDefault);
    lazyNumberFormatData.maximumFractionDigits = mxfd;


    var mnsd = options.minimumSignificantDigits;
    var mxsd = options.maximumSignificantDigits;


    if (mnsd !== undefined || mxsd !== undefined) {
        mnsd = GetNumberOption(options, "minimumSignificantDigits", 1, 21, 1);
        mxsd = GetNumberOption(options, "maximumSignificantDigits", mnsd, 21, 21);
        lazyNumberFormatData.minimumSignificantDigits = mnsd;
        lazyNumberFormatData.maximumSignificantDigits = mxsd;
    }


    var g = GetOption(options, "useGrouping", "boolean", undefined, true);
    lazyNumberFormatData.useGrouping = g;





    setLazyData(internals, "NumberFormat", lazyNumberFormatData);
}
var currencyDigits = {
    BHD: 3,
    BIF: 0,
    BYR: 0,
    CLF: 0,
    CLP: 0,
    DJF: 0,
    IQD: 3,
    GNF: 0,
    ISK: 0,
    JOD: 3,
    JPY: 0,
    KMF: 0,
    KRW: 0,
    KWD: 3,
    LYD: 3,
    OMR: 3,
    PYG: 0,
    RWF: 0,
    TND: 3,
    UGX: 0,
    UYI: 0,
    VND: 0,
    VUV: 0,
    XAF: 0,
    XOF: 0,
    XPF: 0
};







function CurrencyDigits(currency) {
                                                          ;
                                                                            ;

    if (callFunction(std_Object_hasOwnProperty, currencyDigits, currency))
        return currencyDigits[currency];
    return 2;
}
function Intl_NumberFormat_supportedLocalesOf(locales ) {
    var options = arguments.length > 1 ? arguments[1] : undefined;

    var availableLocales = numberFormatInternalProperties.availableLocales();
    var requestedLocales = CanonicalizeLocaleList(locales);
    return SupportedLocales(availableLocales, requestedLocales, options);
}


function getNumberingSystems(locale) {
    var defaultNumberingSystem = intl_numberingSystem(locale);
    return [
        defaultNumberingSystem,
        "arab", "arabext", "bali", "beng", "deva",
        "fullwide", "gujr", "guru", "hanidec", "khmr",
        "knda", "laoo", "latn", "limb", "mlym",
        "mong", "mymr", "orya", "tamldec", "telu",
        "thai", "tibt"
    ];
}


function numberFormatLocaleData(locale) {
    return {
        nu: getNumberingSystems(locale)
    };
}







function numberFormatFormatToBind(value) {




    var x = ToNumber(value);
    return intl_FormatNumber(this, x);
}
function Intl_NumberFormat_format_get() {

    var internals = getNumberFormatInternals(this, "format");


    if (internals.boundFormat === undefined) {

        var F = numberFormatFormatToBind;


        var bf = callFunction(std_Function_bind, F, this);
        internals.boundFormat = bf;
    }

    return internals.boundFormat;
}







function Intl_NumberFormat_resolvedOptions() {

    var internals = getNumberFormatInternals(this, "resolvedOptions");

    var result = {
        locale: internals.locale,
        numberingSystem: internals.numberingSystem,
        style: internals.style,
        minimumIntegerDigits: internals.minimumIntegerDigits,
        minimumFractionDigits: internals.minimumFractionDigits,
        maximumFractionDigits: internals.maximumFractionDigits,
        useGrouping: internals.useGrouping
    };
    var optionalProperties = [
        "currency",
        "currencyDisplay",
        "minimumSignificantDigits",
        "maximumSignificantDigits"
    ];
    for (var i = 0; i < optionalProperties.length; i++) {
        var p = optionalProperties[i];
        if (callFunction(std_Object_hasOwnProperty, internals, p))
            defineProperty(result, p, internals[p]);
    }
    return result;
}
function resolveDateTimeFormatInternals(lazyDateTimeFormatData) {
                                                                        ;
    var internalProps = std_Object_create(null);



    var DateTimeFormat = dateTimeFormatInternalProperties;


    var localeData = DateTimeFormat.localeData;


    var r = ResolveLocale(DateTimeFormat.availableLocales(),
                          lazyDateTimeFormatData.requestedLocales,
                          lazyDateTimeFormatData.localeOpt,
                          DateTimeFormat.relevantExtensionKeys,
                          localeData);


    internalProps.locale = r.locale;
    internalProps.calendar = r.ca;
    internalProps.numberingSystem = r.nu;



    var dataLocale = r.dataLocale;


    internalProps.timeZone = lazyDateTimeFormatData.timeZone;


    var formatOpt = lazyDateTimeFormatData.formatOpt;


    var pattern = toBestICUPattern(dataLocale, formatOpt);


    internalProps.pattern = pattern;


    internalProps.boundFormat = undefined;



    return internalProps;
}






function getDateTimeFormatInternals(obj, methodName) {
    var internals = getIntlObjectInternals(obj, "DateTimeFormat", methodName);
                                                                                          ;


    var internalProps = maybeInternalProperties(internals);
    if (internalProps)
        return internalProps;


    internalProps = resolveDateTimeFormatInternals(internals.lazyData);
    setInternalProperties(internals, internalProps);
    return internalProps;
}






var dateTimeComponentValues = {
    weekday: ["narrow", "short", "long"],
    era: ["narrow", "short", "long"],
    year: ["2-digit", "numeric"],
    month: ["2-digit", "numeric", "narrow", "short", "long"],
    day: ["2-digit", "numeric"],
    hour: ["2-digit", "numeric"],
    minute: ["2-digit", "numeric"],
    second: ["2-digit", "numeric"],
    timeZoneName: ["short", "long"]
};


var dateTimeComponents = std_Object_getOwnPropertyNames(dateTimeComponentValues);
function InitializeDateTimeFormat(dateTimeFormat, locales, options) {
                                                                ;


    if (isInitializedIntlObject(dateTimeFormat))
        ThrowError(333);


    var internals = initializeIntlObject(dateTimeFormat);
    var lazyDateTimeFormatData = std_Object_create(null);


    var requestedLocales = CanonicalizeLocaleList(locales);
    lazyDateTimeFormatData.requestedLocales = requestedLocales;


    options = ToDateTimeOptions(options, "any", "date");



    var localeOpt = new Record();
    lazyDateTimeFormatData.localeOpt = localeOpt;


    var localeMatcher =
        GetOption(options, "localeMatcher", "string", ["lookup", "best fit"],
                  "best fit");
    localeOpt.localeMatcher = localeMatcher;


    var tz = options.timeZone;
    if (tz !== undefined) {
        tz = toASCIIUpperCase(ToString(tz));
        if (tz !== "UTC")
            ThrowError(336, tz);
    }
    lazyDateTimeFormatData.timeZone = tz;


    var formatOpt = new Record();
    lazyDateTimeFormatData.formatOpt = formatOpt;


    var i, prop;
    for (i = 0; i < dateTimeComponents.length; i++) {
        prop = dateTimeComponents[i];
        var value = GetOption(options, prop, "string", dateTimeComponentValues[prop], undefined);
        formatOpt[prop] = value;
    }
    var formatMatcher =
        GetOption(options, "formatMatcher", "string", ["basic", "best fit"],
                  "best fit");




    var hr12 = GetOption(options, "hour12", "boolean", undefined, undefined);


    if (hr12 !== undefined)
        formatOpt.hour12 = hr12;





    setLazyData(internals, "DateTimeFormat", lazyDateTimeFormatData);
}
function toBestICUPattern(locale, options) {


    var skeleton = "";
    switch (options.weekday) {
    case "narrow":
        skeleton += "EEEEE";
        break;
    case "short":
        skeleton += "E";
        break;
    case "long":
        skeleton += "EEEE";
    }
    switch (options.era) {
    case "narrow":
        skeleton += "GGGGG";
        break;
    case "short":
        skeleton += "G";
        break;
    case "long":
        skeleton += "GGGG";
        break;
    }
    switch (options.year) {
    case "2-digit":
        skeleton += "yy";
        break;
    case "numeric":
        skeleton += "y";
        break;
    }
    switch (options.month) {
    case "2-digit":
        skeleton += "MM";
        break;
    case "numeric":
        skeleton += "M";
        break;
    case "narrow":
        skeleton += "MMMMM";
        break;
    case "short":
        skeleton += "MMM";
        break;
    case "long":
        skeleton += "MMMM";
        break;
    }
    switch (options.day) {
    case "2-digit":
        skeleton += "dd";
        break;
    case "numeric":
        skeleton += "d";
        break;
    }
    var hourSkeletonChar = "j";
    if (options.hour12 !== undefined) {
        if (options.hour12)
            hourSkeletonChar = "h";
        else
            hourSkeletonChar = "H";
    }
    switch (options.hour) {
    case "2-digit":
        skeleton += hourSkeletonChar + hourSkeletonChar;
        break;
    case "numeric":
        skeleton += hourSkeletonChar;
        break;
    }
    switch (options.minute) {
    case "2-digit":
        skeleton += "mm";
        break;
    case "numeric":
        skeleton += "m";
        break;
    }
    switch (options.second) {
    case "2-digit":
        skeleton += "ss";
        break;
    case "numeric":
        skeleton += "s";
        break;
    }
    switch (options.timeZoneName) {
    case "short":
        skeleton += "z";
        break;
    case "long":
        skeleton += "zzzz";
        break;
    }


    return intl_patternForSkeleton(locale, skeleton);
}
function ToDateTimeOptions(options, required, defaults) {
                                                             ;
                                                             ;


    if (options === undefined)
        options = null;
    else
        options = ToObject(options);
    options = std_Object_create(options);


    var needDefaults = true;


    if ((required === "date" || required === "any") &&
        (options.weekday !== undefined || options.year !== undefined ||
         options.month !== undefined || options.day !== undefined))
    {
        needDefaults = false;
    }


    if ((required === "time" || required === "any") &&
        (options.hour !== undefined || options.minute !== undefined ||
         options.second !== undefined))
    {
        needDefaults = false;
    }


    if (needDefaults && (defaults === "date" || defaults === "all")) {




        defineProperty(options, "year", "numeric");
        defineProperty(options, "month", "numeric");
        defineProperty(options, "day", "numeric");
    }


    if (needDefaults && (defaults === "time" || defaults === "all")) {

        defineProperty(options, "hour", "numeric");
        defineProperty(options, "minute", "numeric");
        defineProperty(options, "second", "numeric");
    }


    return options;
}
function BasicFormatMatcher(options, formats) {

    var removalPenalty = 120,
        additionPenalty = 20,
        longLessPenalty = 8,
        longMorePenalty = 6,
        shortLessPenalty = 6,
        shortMorePenalty = 3;


    var properties = ["weekday", "era", "year", "month", "day",
        "hour", "minute", "second", "timeZoneName"];


    var values = ["2-digit", "numeric", "narrow", "short", "long"];


    var bestScore = -Infinity;
    var bestFormat;


    var i = 0;
    var len = formats.length;
    while (i < len) {

        var format = formats[i];
        var score = 0;


        var formatProp;
        for (var j = 0; j < properties.length; j++) {
            var property = properties[j];


            var optionsProp = options[property];


            formatProp = undefined;


            if (callFunction(std_Object_hasOwnProperty, format, property))
                formatProp = format[property];

            if (optionsProp === undefined && formatProp !== undefined) {

                score -= additionPenalty;
            } else if (optionsProp !== undefined && formatProp === undefined) {

                score -= removalPenalty;
            } else {

                var optionsPropIndex = callFunction(std_Array_indexOf, values, optionsProp);
                var formatPropIndex = callFunction(std_Array_indexOf, values, formatProp);
                var delta = std_Math_max(std_Math_min(formatPropIndex - optionsPropIndex, 2), -2);
                if (delta === 2)
                    score -= longMorePenalty;
                else if (delta === 1)
                    score -= shortMorePenalty;
                else if (delta === -1)
                    score -= shortLessPenalty;
                else if (delta === -2)
                    score -= longLessPenalty;
            }
        }


        if (score > bestScore) {
            bestScore = score;
            bestFormat = format;
        }


        i++;
    }


    return bestFormat;
}
function BestFitFormatMatcher(options, formats) {

    return BasicFormatMatcher(options, formats);
}
function Intl_DateTimeFormat_supportedLocalesOf(locales ) {
    var options = arguments.length > 1 ? arguments[1] : undefined;

    var availableLocales = dateTimeFormatInternalProperties.availableLocales();
    var requestedLocales = CanonicalizeLocaleList(locales);
    return SupportedLocales(availableLocales, requestedLocales, options);
}







var dateTimeFormatInternalProperties = {
    localeData: dateTimeFormatLocaleData,
    _availableLocales: null,
    availableLocales: function()
    {
        var locales = this._availableLocales;
        if (locales)
            return locales;
        return (this._availableLocales =
          addOldStyleLanguageTags(intl_DateTimeFormat_availableLocales()));
    },
    relevantExtensionKeys: ["ca", "nu"]
};


function dateTimeFormatLocaleData(locale) {
    return {
        ca: intl_availableCalendars(locale),
        nu: getNumberingSystems(locale)
    };
}







function dateTimeFormatFormatToBind() {

    var date = arguments.length > 0 ? arguments[0] : undefined;
    var x = (date === undefined) ? std_Date_now() : ToNumber(date);


    return intl_FormatDateTime(this, x);
}
function Intl_DateTimeFormat_format_get() {

    var internals = getDateTimeFormatInternals(this, "format");


    if (internals.boundFormat === undefined) {

        var F = dateTimeFormatFormatToBind;


        var bf = callFunction(std_Function_bind, F, this);
        internals.boundFormat = bf;
    }


    return internals.boundFormat;
}







function Intl_DateTimeFormat_resolvedOptions() {

    var internals = getDateTimeFormatInternals(this, "resolvedOptions");

    var result = {
        locale: internals.locale,
        calendar: internals.calendar,
        numberingSystem: internals.numberingSystem,
        timeZone: internals.timeZone
    };
    resolveICUPattern(internals.pattern, result);
    return result;
}





var icuPatternCharToComponent = {
    E: "weekday",
    G: "era",
    y: "year",
    M: "month",
    L: "month",
    d: "day",
    h: "hour",
    H: "hour",
    k: "hour",
    K: "hour",
    m: "minute",
    s: "second",
    z: "timeZoneName",
    v: "timeZoneName",
    V: "timeZoneName"
};
function resolveICUPattern(pattern, result) {
                                                 ;
    var i = 0;
    while (i < pattern.length) {
        var c = pattern[i++];
        if (c === "'") {
            while (i < pattern.length && pattern[i] !== "'")
                i++;
            i++;
        } else {
            var count = 1;
            while (i < pattern.length && pattern[i] === c) {
                i++;
                count++;
            }
            var value;
            switch (c) {

            case "G":
            case "E":
            case "z":
            case "v":
            case "V":
                if (count <= 3)
                    value = "short";
                else if (count === 4)
                    value = "long";
                else
                    value = "narrow";
                break;

            case "y":
            case "d":
            case "h":
            case "H":
            case "m":
            case "s":
            case "k":
            case "K":
                if (count === 2)
                    value = "2-digit";
                else
                    value = "numeric";
                break;

            case "M":
            case "L":
                if (count === 1)
                    value = "numeric";
                else if (count === 2)
                    value = "2-digit";
                else if (count === 3)
                    value = "short";
                else if (count === 4)
                    value = "long";
                else
                    value = "narrow";
                break;
            default:

            }
            if (callFunction(std_Object_hasOwnProperty, icuPatternCharToComponent, c))
                defineProperty(result, icuPatternCharToComponent[c], value);
            if (c === "h" || c === "K")
                defineProperty(result, "hour12", true);
            else if (c === "H" || c === "k")
                defineProperty(result, "hour12", false);
        }
    }
}





var langTagMappings = {
    "art-lojban": "jbo",
    "cel-gaulish": "cel-gaulish",
    "en-gb-oed": "en-GB-oed",
    "i-ami": "ami",
    "i-bnn": "bnn",
    "i-default": "i-default",
    "i-enochian": "i-enochian",
    "i-hak": "hak",
    "i-klingon": "tlh",
    "i-lux": "lb",
    "i-mingo": "i-mingo",
    "i-navajo": "nv",
    "i-pwn": "pwn",
    "i-tao": "tao",
    "i-tay": "tay",
    "i-tsu": "tsu",
    "ja-latn-hepburn-heploc": "ja-Latn-alalc97",
    "no-bok": "nb",
    "no-nyn": "nn",
    "sgn-be-fr": "sfb",
    "sgn-be-nl": "vgt",
    "sgn-br": "bzs",
    "sgn-ch-de": "sgg",
    "sgn-co": "csn",
    "sgn-de": "gsg",
    "sgn-dk": "dsl",
    "sgn-es": "ssp",
    "sgn-fr": "fsl",
    "sgn-gb": "bfi",
    "sgn-gr": "gss",
    "sgn-ie": "isg",
    "sgn-it": "ise",
    "sgn-jp": "jsl",
    "sgn-mx": "mfs",
    "sgn-ni": "ncs",
    "sgn-nl": "dse",
    "sgn-no": "nsl",
    "sgn-pt": "psr",
    "sgn-se": "swl",
    "sgn-us": "ase",
    "sgn-za": "sfs",
    "zh-cmn": "cmn",
    "zh-cmn-hans": "cmn-Hans",
    "zh-cmn-hant": "cmn-Hant",
    "zh-gan": "gan",
    "zh-guoyu": "cmn",
    "zh-hakka": "hak",
    "zh-min": "zh-min",
    "zh-min-nan": "nan",
    "zh-wuu": "wuu",
    "zh-xiang": "hsn",
    "zh-yue": "yue",
};




var langSubtagMappings = {
    "BU": "MM",
    "DD": "DE",
    "FX": "FR",
    "TP": "TL",
    "YD": "YE",
    "ZR": "CD",
    "ayx": "nun",
    "bjd": "drl",
    "ccq": "rki",
    "cjr": "mom",
    "cka": "cmr",
    "cmk": "xch",
    "drh": "khk",
    "drw": "prs",
    "gav": "dev",
    "hrr": "jal",
    "ibi": "opa",
    "in": "id",
    "iw": "he",
    "ji": "yi",
    "jw": "jv",
    "kgh": "kml",
    "lcq": "ppr",
    "mo": "ro",
    "mst": "mry",
    "myt": "mry",
    "sca": "hle",
    "tie": "ras",
    "tkk": "twm",
    "tlw": "weo",
    "tnf": "prs",
    "ybd": "rki",
    "yma": "lrr",
};




var extlangMappings = {
    "aao": {preferred: "aao", prefix: "ar"},
    "abh": {preferred: "abh", prefix: "ar"},
    "abv": {preferred: "abv", prefix: "ar"},
    "acm": {preferred: "acm", prefix: "ar"},
    "acq": {preferred: "acq", prefix: "ar"},
    "acw": {preferred: "acw", prefix: "ar"},
    "acx": {preferred: "acx", prefix: "ar"},
    "acy": {preferred: "acy", prefix: "ar"},
    "adf": {preferred: "adf", prefix: "ar"},
    "ads": {preferred: "ads", prefix: "sgn"},
    "aeb": {preferred: "aeb", prefix: "ar"},
    "aec": {preferred: "aec", prefix: "ar"},
    "aed": {preferred: "aed", prefix: "sgn"},
    "aen": {preferred: "aen", prefix: "sgn"},
    "afb": {preferred: "afb", prefix: "ar"},
    "afg": {preferred: "afg", prefix: "sgn"},
    "ajp": {preferred: "ajp", prefix: "ar"},
    "apc": {preferred: "apc", prefix: "ar"},
    "apd": {preferred: "apd", prefix: "ar"},
    "arb": {preferred: "arb", prefix: "ar"},
    "arq": {preferred: "arq", prefix: "ar"},
    "ars": {preferred: "ars", prefix: "ar"},
    "ary": {preferred: "ary", prefix: "ar"},
    "arz": {preferred: "arz", prefix: "ar"},
    "ase": {preferred: "ase", prefix: "sgn"},
    "asf": {preferred: "asf", prefix: "sgn"},
    "asp": {preferred: "asp", prefix: "sgn"},
    "asq": {preferred: "asq", prefix: "sgn"},
    "asw": {preferred: "asw", prefix: "sgn"},
    "auz": {preferred: "auz", prefix: "ar"},
    "avl": {preferred: "avl", prefix: "ar"},
    "ayh": {preferred: "ayh", prefix: "ar"},
    "ayl": {preferred: "ayl", prefix: "ar"},
    "ayn": {preferred: "ayn", prefix: "ar"},
    "ayp": {preferred: "ayp", prefix: "ar"},
    "bbz": {preferred: "bbz", prefix: "ar"},
    "bfi": {preferred: "bfi", prefix: "sgn"},
    "bfk": {preferred: "bfk", prefix: "sgn"},
    "bjn": {preferred: "bjn", prefix: "ms"},
    "bog": {preferred: "bog", prefix: "sgn"},
    "bqn": {preferred: "bqn", prefix: "sgn"},
    "bqy": {preferred: "bqy", prefix: "sgn"},
    "btj": {preferred: "btj", prefix: "ms"},
    "bve": {preferred: "bve", prefix: "ms"},
    "bvl": {preferred: "bvl", prefix: "sgn"},
    "bvu": {preferred: "bvu", prefix: "ms"},
    "bzs": {preferred: "bzs", prefix: "sgn"},
    "cdo": {preferred: "cdo", prefix: "zh"},
    "cds": {preferred: "cds", prefix: "sgn"},
    "cjy": {preferred: "cjy", prefix: "zh"},
    "cmn": {preferred: "cmn", prefix: "zh"},
    "coa": {preferred: "coa", prefix: "ms"},
    "cpx": {preferred: "cpx", prefix: "zh"},
    "csc": {preferred: "csc", prefix: "sgn"},
    "csd": {preferred: "csd", prefix: "sgn"},
    "cse": {preferred: "cse", prefix: "sgn"},
    "csf": {preferred: "csf", prefix: "sgn"},
    "csg": {preferred: "csg", prefix: "sgn"},
    "csl": {preferred: "csl", prefix: "sgn"},
    "csn": {preferred: "csn", prefix: "sgn"},
    "csq": {preferred: "csq", prefix: "sgn"},
    "csr": {preferred: "csr", prefix: "sgn"},
    "czh": {preferred: "czh", prefix: "zh"},
    "czo": {preferred: "czo", prefix: "zh"},
    "doq": {preferred: "doq", prefix: "sgn"},
    "dse": {preferred: "dse", prefix: "sgn"},
    "dsl": {preferred: "dsl", prefix: "sgn"},
    "dup": {preferred: "dup", prefix: "ms"},
    "ecs": {preferred: "ecs", prefix: "sgn"},
    "esl": {preferred: "esl", prefix: "sgn"},
    "esn": {preferred: "esn", prefix: "sgn"},
    "eso": {preferred: "eso", prefix: "sgn"},
    "eth": {preferred: "eth", prefix: "sgn"},
    "fcs": {preferred: "fcs", prefix: "sgn"},
    "fse": {preferred: "fse", prefix: "sgn"},
    "fsl": {preferred: "fsl", prefix: "sgn"},
    "fss": {preferred: "fss", prefix: "sgn"},
    "gan": {preferred: "gan", prefix: "zh"},
    "gds": {preferred: "gds", prefix: "sgn"},
    "gom": {preferred: "gom", prefix: "kok"},
    "gse": {preferred: "gse", prefix: "sgn"},
    "gsg": {preferred: "gsg", prefix: "sgn"},
    "gsm": {preferred: "gsm", prefix: "sgn"},
    "gss": {preferred: "gss", prefix: "sgn"},
    "gus": {preferred: "gus", prefix: "sgn"},
    "hab": {preferred: "hab", prefix: "sgn"},
    "haf": {preferred: "haf", prefix: "sgn"},
    "hak": {preferred: "hak", prefix: "zh"},
    "hds": {preferred: "hds", prefix: "sgn"},
    "hji": {preferred: "hji", prefix: "ms"},
    "hks": {preferred: "hks", prefix: "sgn"},
    "hos": {preferred: "hos", prefix: "sgn"},
    "hps": {preferred: "hps", prefix: "sgn"},
    "hsh": {preferred: "hsh", prefix: "sgn"},
    "hsl": {preferred: "hsl", prefix: "sgn"},
    "hsn": {preferred: "hsn", prefix: "zh"},
    "icl": {preferred: "icl", prefix: "sgn"},
    "ils": {preferred: "ils", prefix: "sgn"},
    "inl": {preferred: "inl", prefix: "sgn"},
    "ins": {preferred: "ins", prefix: "sgn"},
    "ise": {preferred: "ise", prefix: "sgn"},
    "isg": {preferred: "isg", prefix: "sgn"},
    "isr": {preferred: "isr", prefix: "sgn"},
    "jak": {preferred: "jak", prefix: "ms"},
    "jax": {preferred: "jax", prefix: "ms"},
    "jcs": {preferred: "jcs", prefix: "sgn"},
    "jhs": {preferred: "jhs", prefix: "sgn"},
    "jls": {preferred: "jls", prefix: "sgn"},
    "jos": {preferred: "jos", prefix: "sgn"},
    "jsl": {preferred: "jsl", prefix: "sgn"},
    "jus": {preferred: "jus", prefix: "sgn"},
    "kgi": {preferred: "kgi", prefix: "sgn"},
    "knn": {preferred: "knn", prefix: "kok"},
    "kvb": {preferred: "kvb", prefix: "ms"},
    "kvk": {preferred: "kvk", prefix: "sgn"},
    "kvr": {preferred: "kvr", prefix: "ms"},
    "kxd": {preferred: "kxd", prefix: "ms"},
    "lbs": {preferred: "lbs", prefix: "sgn"},
    "lce": {preferred: "lce", prefix: "ms"},
    "lcf": {preferred: "lcf", prefix: "ms"},
    "liw": {preferred: "liw", prefix: "ms"},
    "lls": {preferred: "lls", prefix: "sgn"},
    "lsg": {preferred: "lsg", prefix: "sgn"},
    "lsl": {preferred: "lsl", prefix: "sgn"},
    "lso": {preferred: "lso", prefix: "sgn"},
    "lsp": {preferred: "lsp", prefix: "sgn"},
    "lst": {preferred: "lst", prefix: "sgn"},
    "lsy": {preferred: "lsy", prefix: "sgn"},
    "ltg": {preferred: "ltg", prefix: "lv"},
    "lvs": {preferred: "lvs", prefix: "lv"},
    "lzh": {preferred: "lzh", prefix: "zh"},
    "max": {preferred: "max", prefix: "ms"},
    "mdl": {preferred: "mdl", prefix: "sgn"},
    "meo": {preferred: "meo", prefix: "ms"},
    "mfa": {preferred: "mfa", prefix: "ms"},
    "mfb": {preferred: "mfb", prefix: "ms"},
    "mfs": {preferred: "mfs", prefix: "sgn"},
    "min": {preferred: "min", prefix: "ms"},
    "mnp": {preferred: "mnp", prefix: "zh"},
    "mqg": {preferred: "mqg", prefix: "ms"},
    "mre": {preferred: "mre", prefix: "sgn"},
    "msd": {preferred: "msd", prefix: "sgn"},
    "msi": {preferred: "msi", prefix: "ms"},
    "msr": {preferred: "msr", prefix: "sgn"},
    "mui": {preferred: "mui", prefix: "ms"},
    "mzc": {preferred: "mzc", prefix: "sgn"},
    "mzg": {preferred: "mzg", prefix: "sgn"},
    "mzy": {preferred: "mzy", prefix: "sgn"},
    "nan": {preferred: "nan", prefix: "zh"},
    "nbs": {preferred: "nbs", prefix: "sgn"},
    "ncs": {preferred: "ncs", prefix: "sgn"},
    "nsi": {preferred: "nsi", prefix: "sgn"},
    "nsl": {preferred: "nsl", prefix: "sgn"},
    "nsp": {preferred: "nsp", prefix: "sgn"},
    "nsr": {preferred: "nsr", prefix: "sgn"},
    "nzs": {preferred: "nzs", prefix: "sgn"},
    "okl": {preferred: "okl", prefix: "sgn"},
    "orn": {preferred: "orn", prefix: "ms"},
    "ors": {preferred: "ors", prefix: "ms"},
    "pel": {preferred: "pel", prefix: "ms"},
    "pga": {preferred: "pga", prefix: "ar"},
    "pks": {preferred: "pks", prefix: "sgn"},
    "prl": {preferred: "prl", prefix: "sgn"},
    "prz": {preferred: "prz", prefix: "sgn"},
    "psc": {preferred: "psc", prefix: "sgn"},
    "psd": {preferred: "psd", prefix: "sgn"},
    "pse": {preferred: "pse", prefix: "ms"},
    "psg": {preferred: "psg", prefix: "sgn"},
    "psl": {preferred: "psl", prefix: "sgn"},
    "pso": {preferred: "pso", prefix: "sgn"},
    "psp": {preferred: "psp", prefix: "sgn"},
    "psr": {preferred: "psr", prefix: "sgn"},
    "pys": {preferred: "pys", prefix: "sgn"},
    "rms": {preferred: "rms", prefix: "sgn"},
    "rsi": {preferred: "rsi", prefix: "sgn"},
    "rsl": {preferred: "rsl", prefix: "sgn"},
    "sdl": {preferred: "sdl", prefix: "sgn"},
    "sfb": {preferred: "sfb", prefix: "sgn"},
    "sfs": {preferred: "sfs", prefix: "sgn"},
    "sgg": {preferred: "sgg", prefix: "sgn"},
    "sgx": {preferred: "sgx", prefix: "sgn"},
    "shu": {preferred: "shu", prefix: "ar"},
    "slf": {preferred: "slf", prefix: "sgn"},
    "sls": {preferred: "sls", prefix: "sgn"},
    "sqk": {preferred: "sqk", prefix: "sgn"},
    "sqs": {preferred: "sqs", prefix: "sgn"},
    "ssh": {preferred: "ssh", prefix: "ar"},
    "ssp": {preferred: "ssp", prefix: "sgn"},
    "ssr": {preferred: "ssr", prefix: "sgn"},
    "svk": {preferred: "svk", prefix: "sgn"},
    "swc": {preferred: "swc", prefix: "sw"},
    "swh": {preferred: "swh", prefix: "sw"},
    "swl": {preferred: "swl", prefix: "sgn"},
    "syy": {preferred: "syy", prefix: "sgn"},
    "tmw": {preferred: "tmw", prefix: "ms"},
    "tse": {preferred: "tse", prefix: "sgn"},
    "tsm": {preferred: "tsm", prefix: "sgn"},
    "tsq": {preferred: "tsq", prefix: "sgn"},
    "tss": {preferred: "tss", prefix: "sgn"},
    "tsy": {preferred: "tsy", prefix: "sgn"},
    "tza": {preferred: "tza", prefix: "sgn"},
    "ugn": {preferred: "ugn", prefix: "sgn"},
    "ugy": {preferred: "ugy", prefix: "sgn"},
    "ukl": {preferred: "ukl", prefix: "sgn"},
    "uks": {preferred: "uks", prefix: "sgn"},
    "urk": {preferred: "urk", prefix: "ms"},
    "uzn": {preferred: "uzn", prefix: "uz"},
    "uzs": {preferred: "uzs", prefix: "uz"},
    "vgt": {preferred: "vgt", prefix: "sgn"},
    "vkk": {preferred: "vkk", prefix: "ms"},
    "vkt": {preferred: "vkt", prefix: "ms"},
    "vsi": {preferred: "vsi", prefix: "sgn"},
    "vsl": {preferred: "vsl", prefix: "sgn"},
    "vsv": {preferred: "vsv", prefix: "sgn"},
    "wuu": {preferred: "wuu", prefix: "zh"},
    "xki": {preferred: "xki", prefix: "sgn"},
    "xml": {preferred: "xml", prefix: "sgn"},
    "xmm": {preferred: "xmm", prefix: "ms"},
    "xms": {preferred: "xms", prefix: "sgn"},
    "yds": {preferred: "yds", prefix: "sgn"},
    "ysl": {preferred: "ysl", prefix: "sgn"},
    "yue": {preferred: "yue", prefix: "zh"},
    "zib": {preferred: "zib", prefix: "sgn"},
    "zlm": {preferred: "zlm", prefix: "ms"},
    "zmi": {preferred: "zmi", prefix: "ms"},
    "zsl": {preferred: "zsl", prefix: "sgn"},
    "zsm": {preferred: "zsm", prefix: "ms"},
};




function IteratorIdentity() {
    return this;
}

var LegacyIteratorWrapperMap = new std_WeakMap();

function LegacyIteratorNext(arg) {
    var iter = callFunction(std_WeakMap_get, LegacyIteratorWrapperMap, this);
    try {
        return { value: iter.next(arg), done: false };
    } catch (e) {
        if (e instanceof std_StopIteration)
            return { value: undefined, done: true };
        throw e;
    }
}

function LegacyIteratorThrow(exn) {
    var iter = callFunction(std_WeakMap_get, LegacyIteratorWrapperMap, this);
    try {
        return { value: iter.throw(exn), done: false };
    } catch (e) {
        if (e instanceof std_StopIteration)
            return { value: undefined, done: true };
        throw e;
    }
}

function LegacyIterator(iter) {
    callFunction(std_WeakMap_set, LegacyIteratorWrapperMap, this, iter);
}

function LegacyGeneratorIterator(iter) {
    callFunction(std_WeakMap_set, LegacyIteratorWrapperMap, this, iter);
}

var LegacyIteratorsInitialized = std_Object_create(null);

function InitLegacyIterators() {
    var props = std_Object_create(null);

    props.next = std_Object_create(null);
    props.next.value = LegacyIteratorNext;
    props.next.enumerable = false;
    props.next.configurable = true;
    props.next.writable = true;

    props[std_iterator] = std_Object_create(null);
    props[std_iterator].value = IteratorIdentity;
    props[std_iterator].enumerable = false;
    props[std_iterator].configurable = true;
    props[std_iterator].writable = true;

    var LegacyIteratorProto = std_Object_create(GetIteratorPrototype(), props);
    MakeConstructible(LegacyIterator, LegacyIteratorProto);

    props.throw = std_Object_create(null);
    props.throw.value = LegacyIteratorThrow;
    props.throw.enumerable = false;
    props.throw.configurable = true;
    props.throw.writable = true;

    var LegacyGeneratorIteratorProto = std_Object_create(GetIteratorPrototype(), props);
    MakeConstructible(LegacyGeneratorIterator, LegacyGeneratorIteratorProto);

    LegacyIteratorsInitialized.initialized = true;
}

function NewLegacyIterator(iter, wrapper) {
    if (!LegacyIteratorsInitialized.initialized)
        InitLegacyIterators();

    return new wrapper(iter);
}

function LegacyIteratorShim() {
    return NewLegacyIterator(ToObject(this), LegacyIterator);
}

function LegacyGeneratorIteratorShim() {
    return NewLegacyIterator(ToObject(this), LegacyGeneratorIterator);
}






function MapForEach(callbackfn, thisArg = undefined) {

    var M = this;
    if (!IsObject(M))
        ThrowError(5, typeof M);


    try {
        std_Map_has.call(M);
    } catch (e) {
        ThrowError(5, typeof M);
    }


    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));


    var entries = std_Map_iterator.call(M);
    while (true) {
        var result = std_Map_iterator_next.call(entries);
        if (result.done)
            break;
        var entry = result.value;
        callFunction(callbackfn, thisArg, entry[1], entry[0], M);
    }
}







var numberFormatCache = new Record();
function Number_toLocaleString() {

    var x = callFunction(std_Number_valueOf, this);


    var locales = arguments.length > 0 ? arguments[0] : undefined;
    var options = arguments.length > 1 ? arguments[1] : undefined;


    var numberFormat;
    if (locales === undefined && options === undefined) {


        if (numberFormatCache.numberFormat === undefined)
            numberFormatCache.numberFormat = intl_NumberFormat(locales, options);
        numberFormat = numberFormatCache.numberFormat;
    } else {
        numberFormat = intl_NumberFormat(locales, options);
    }


    return intl_FormatNumber(numberFormat, x);
}
function ComputeProducts(shape) {
  var product = 1;
  var products = [1];
  var sdimensionality = shape.length;
  for (var i = sdimensionality - 1; i > 0; i--) {
    product *= shape[i];
    callFunction(std_Array_push, products, product);;
  }
  return products;
}





function ComputeIndices(shape, index1d) {

  var products = ComputeProducts(shape);
  var l = shape.length;

  var result = [];
  for (var i = 0; i < l; i++) {


    var stride = products[l - i - 1];


    var index = (index1d / stride) | 0;
    callFunction(std_Array_push, result, index);;


    index1d -= (index * stride);
  }

  return result;
}

function StepIndices(shape, indices) {
  for (var i = shape.length - 1; i >= 0; i--) {
    var indexi = indices[i] + 1;
    if (indexi < shape[i]) {
      indices[i] = indexi;
      return;
    }
    indices[i] = 0;
  }
}
function ParallelArrayConstructEmpty() {
  this.buffer = [];
  this.offset = 0;
  this.shape = [0];
  this.get = ParallelArrayGet1;
}





function ParallelArrayConstructFromArray(array) {
  var buffer = ToObject(array);
  var length = buffer.length >>> 0;
  if (length !== buffer.length)
    ThrowError(304, "");

  var buffer1 = [];
  for (var i = 0; i < length; i++)
    callFunction(std_Array_push, buffer1, buffer[i]);;

  this.buffer = buffer1;
  this.offset = 0;
  this.shape = [length];
  this.get = ParallelArrayGet1;
}
function ParallelArrayConstructFromFunction(shape, func) {
  return ParallelArrayConstructFromComprehension(this, shape, func, undefined);
}





function ParallelArrayConstructFromFunctionMode(shape, func, mode) {
  return ParallelArrayConstructFromComprehension(this, shape, func, mode);
}
function ParallelArrayConstructFromComprehension(self, shape, func, mode) {


  if (typeof shape === "number") {
    var length = shape >>> 0;
    if (length !== shape)
      ThrowError(304, "");
    ParallelArrayBuild(self, [length], func, mode);
  } else if (!shape || typeof shape.length !== "number") {
    ThrowError(304, "");
  } else {
    var shape1 = [];
    for (var i = 0, l = shape.length; i < l; i++) {
      var s0 = shape[i];
      var s1 = s0 >>> 0;
      if (s1 !== s0)
        ThrowError(304, "");
      callFunction(std_Array_push, shape1, s1);;
    }
    ParallelArrayBuild(self, shape1, func, mode);
  }
}







function ParallelArrayView(shape, buffer, offset) {
  this.shape = shape;
  this.buffer = buffer;
  this.offset = offset;

  switch (shape.length) {
    case 1: this.get = ParallelArrayGet1; break;
    case 2: this.get = ParallelArrayGet2; break;
    case 3: this.get = ParallelArrayGet3; break;
    default: this.get = ParallelArrayGetN; break;
  }




  return this;
}







function ParallelArrayBuild(self, shape, func, mode) {
  self.offset = 0;
  self.shape = shape;

  var length;
  var xDimension, yDimension, zDimension;
  var computefunc;

  switch (shape.length) {
  case 1:
    length = shape[0];
    self.get = ParallelArrayGet1;
    computefunc = fill1;
    break;
  case 2:
    xDimension = shape[0];
    yDimension = shape[1];
    length = xDimension * yDimension;
    self.get = ParallelArrayGet2;
    computefunc = fill2;
    break;
  case 3:
    xDimension = shape[0];
    yDimension = shape[1];
    zDimension = shape[2];
    length = xDimension * yDimension * zDimension;
    self.get = ParallelArrayGet3;
    computefunc = fill3;
    break;
  default:
    length = 1;
    for (var i = 0; i < shape.length; i++)
      length *= shape[i];
    self.get = ParallelArrayGetN;
    computefunc = fillN;
    break;
  }

  var buffer = self.buffer = NewDenseArray(length);

  parallel: for (;;) {






    if (ShouldForceSequential())
      break parallel;
    if (!((!mode || mode.mode !== "seq")))
      break parallel;
    if (computefunc === fillN)
      break parallel;

    var chunks = ComputeNumChunks(length);
    var numSlices = ForkJoinSlices();
    var info = ComputeAllSliceBounds(chunks, numSlices);
    ForkJoin(constructSlice, ForkJoinMode(mode));
    return;
  }


  do { if (mode) AssertSequentialIsOK(mode) } while(false);
  computefunc(0, length);
  return;

  function constructSlice(sliceId, numSlices, warmup) {
    var chunkPos = info[((sliceId << 2) + 2)];
    var chunkEnd = info[((sliceId << 2) + 1)];

    if (warmup && chunkEnd > chunkPos)
      chunkEnd = chunkPos + 1;

    while (chunkPos < chunkEnd) {
      var indexStart = chunkPos << 5;
      var indexEnd = std_Math_min(indexStart + 32, length);
      computefunc(indexStart, indexEnd);
      UnsafePutElements(info, ((sliceId << 2) + 2), ++chunkPos);
    }

    return chunkEnd == info[((sliceId << 2) + 1)];
  }

  function fill1(indexStart, indexEnd) {
    for (var i = indexStart; i < indexEnd; i++)
      UnsafePutElements(buffer, i, func(i));
  }

  function fill2(indexStart, indexEnd) {
    var x = (indexStart / yDimension) | 0;
    var y = indexStart - x * yDimension;
    for (var i = indexStart; i < indexEnd; i++) {
      UnsafePutElements(buffer, i, func(x, y));
      if (++y == yDimension) {
        y = 0;
        ++x;
      }
    }
  }

  function fill3(indexStart, indexEnd) {
    var x = (indexStart / (yDimension * zDimension)) | 0;
    var r = indexStart - x * yDimension * zDimension;
    var y = (r / zDimension) | 0;
    var z = r - y * zDimension;
    for (var i = indexStart; i < indexEnd; i++) {
      UnsafePutElements(buffer, i, func(x, y, z));
      if (++z == zDimension) {
        z = 0;
        if (++y == yDimension) {
          y = 0;
          ++x;
        }
      }
    }
  }

  function fillN(indexStart, indexEnd) {
    var indices = ComputeIndices(shape, indexStart);
    for (var i = indexStart; i < indexEnd; i++) {
      var result = callFunction(std_Function_apply, func, null, indices);
      UnsafePutElements(buffer, i, result);
      StepIndices(shape, indices);
    }
  }
}






function ParallelArrayMap(func, mode) {



  var self = this;
  var length = self.shape[0];
  var buffer = NewDenseArray(length);

  parallel: for (;;) {
    if (ShouldForceSequential())
      break parallel;
    if (!((!mode || mode.mode !== "seq")))
      break parallel;

    var chunks = ComputeNumChunks(length);
    var numSlices = ForkJoinSlices();
    var info = ComputeAllSliceBounds(chunks, numSlices);
    ForkJoin(mapSlice, ForkJoinMode(mode));
    return NewParallelArray(ParallelArrayView, [length], buffer, 0);
  }


  do { if (mode) AssertSequentialIsOK(mode) } while(false);
  for (var i = 0; i < length; i++) {

    var v = func(self.get(i), i, self);
    UnsafePutElements(buffer, i, v);
  }
  return NewParallelArray(ParallelArrayView, [length], buffer, 0);

  function mapSlice(sliceId, numSlices, warmup) {
    var chunkPos = info[((sliceId << 2) + 2)];
    var chunkEnd = info[((sliceId << 2) + 1)];

    if (warmup && chunkEnd > chunkPos + 1)
      chunkEnd = chunkPos + 1;

    while (chunkPos < chunkEnd) {
      var indexStart = chunkPos << 5;
      var indexEnd = std_Math_min(indexStart + 32, length);

      for (var i = indexStart; i < indexEnd; i++)
        UnsafePutElements(buffer, i, func(self.get(i), i, self));

      UnsafePutElements(info, ((sliceId << 2) + 2), ++chunkPos);
    }

    return chunkEnd == info[((sliceId << 2) + 1)];
  }

  return undefined;
}





function ParallelArrayReduce(func, mode) {



  var self = this;
  var length = self.shape[0];

  if (length === 0)
    ThrowError(306);

  parallel: for (;;) {
    if (ShouldForceSequential())
      break parallel;
    if (!((!mode || mode.mode !== "seq")))
      break parallel;

    var chunks = ComputeNumChunks(length);
    var numSlices = ForkJoinSlices();
    if (chunks < numSlices)
      break parallel;

    var info = ComputeAllSliceBounds(chunks, numSlices);
    var subreductions = NewDenseArray(numSlices);
    ForkJoin(reduceSlice, ForkJoinMode(mode));
    var accumulator = subreductions[0];
    for (var i = 1; i < numSlices; i++)
      accumulator = func(accumulator, subreductions[i]);
    return accumulator;
  }


  do { if (mode) AssertSequentialIsOK(mode) } while(false);
  var accumulator = self.get(0);
  for (var i = 1; i < length; i++)
    accumulator = func(accumulator, self.get(i));
  return accumulator;

  function reduceSlice(sliceId, numSlices, warmup) {
    var chunkStart = info[((sliceId << 2) + 0)];
    var chunkPos = info[((sliceId << 2) + 2)];
    var chunkEnd = info[((sliceId << 2) + 1)];
    if (warmup && chunkEnd > chunkPos + 2)
      chunkEnd = chunkPos + 2;

    if (chunkStart === chunkPos) {
      var indexPos = chunkStart << 5;
      var accumulator = reduceChunk(self.get(indexPos), indexPos + 1, indexPos + 32);

      UnsafePutElements(subreductions, sliceId, accumulator,
                        info, ((sliceId << 2) + 2), ++chunkPos);
    }

    var accumulator = subreductions[sliceId];

    while (chunkPos < chunkEnd) {
      var indexPos = chunkPos << 5;
      accumulator = reduceChunk(accumulator, indexPos, indexPos + 32);
      UnsafePutElements(subreductions, sliceId, accumulator, info, ((sliceId << 2) + 2), ++chunkPos);
    }

    return chunkEnd == info[((sliceId << 2) + 1)];
  }

  function reduceChunk(accumulator, from, to) {
    to = std_Math_min(to, length);
    for (var i = from; i < to; i++)
      accumulator = func(accumulator, self.get(i));
    return accumulator;
  }

  return undefined;
}







function ParallelArrayScan(func, mode) {



  var self = this;
  var length = self.shape[0];

  if (length === 0)
    ThrowError(306);

  var buffer = NewDenseArray(length);

  parallel: for (;;) {
    if (ShouldForceSequential())
      break parallel;
    if (!((!mode || mode.mode !== "seq")))
      break parallel;

    var chunks = ComputeNumChunks(length);
    var numSlices = ForkJoinSlices();
    if (chunks < numSlices)
      break parallel;
    var info = ComputeAllSliceBounds(chunks, numSlices);


    ForkJoin(phase1, ForkJoinMode(mode));


    var intermediates = [];
    var accumulator = buffer[finalElement(0)];
    callFunction(std_Array_push, intermediates, accumulator);;
    for (var i = 1; i < numSlices - 1; i++) {
      accumulator = func(accumulator, buffer[finalElement(i)]);
      callFunction(std_Array_push, intermediates, accumulator);;
    }



    for (var i = 0; i < numSlices; i++) {
      info[((i << 2) + 2)] = info[((i << 2) + 0)] << 5;
      info[((i << 2) + 1)] = info[((i << 2) + 1)] << 5;
    }
    info[((numSlices - 1 << 2) + 1)] = std_Math_min(info[((numSlices - 1 << 2) + 1)], length);


    ForkJoin(phase2, ForkJoinMode(mode));
    return NewParallelArray(ParallelArrayView, [length], buffer, 0);
  }


  do { if (mode) AssertSequentialIsOK(mode) } while(false);
  scan(self.get(0), 0, length);
  return NewParallelArray(ParallelArrayView, [length], buffer, 0);

  function scan(accumulator, start, end) {
    UnsafePutElements(buffer, start, accumulator);
    for (var i = start + 1; i < end; i++) {
      accumulator = func(accumulator, self.get(i));
      UnsafePutElements(buffer, i, accumulator);
    }
    return accumulator;
  }
  function phase1(sliceId, numSlices, warmup) {
    var chunkStart = info[((sliceId << 2) + 0)];
    var chunkPos = info[((sliceId << 2) + 2)];
    var chunkEnd = info[((sliceId << 2) + 1)];

    if (warmup && chunkEnd > chunkPos + 2)
      chunkEnd = chunkPos + 2;

    if (chunkPos == chunkStart) {


      var indexStart = chunkPos << 5;
      var indexEnd = std_Math_min(indexStart + 32, length);
      scan(self.get(indexStart), indexStart, indexEnd);
      UnsafePutElements(info, ((sliceId << 2) + 2), ++chunkPos);
    }

    while (chunkPos < chunkEnd) {





      var indexStart = chunkPos << 5;
      var indexEnd = std_Math_min(indexStart + 32, length);
      var accumulator = func(buffer[indexStart - 1], self.get(indexStart));
      scan(accumulator, indexStart, indexEnd);
      UnsafePutElements(info, ((sliceId << 2) + 2), ++chunkPos);
    }

    return chunkEnd == info[((sliceId << 2) + 1)];
  }




  function finalElement(sliceId) {
    var chunkEnd = info[((sliceId << 2) + 1)];
    var indexStart = std_Math_min(chunkEnd << 5, length);
    return indexStart - 1;
  }
  function phase2(sliceId, numSlices, warmup) {
    if (sliceId == 0)
      return true;

    var indexPos = info[((sliceId << 2) + 2)];
    var indexEnd = info[((sliceId << 2) + 1)];

    if (warmup)
      indexEnd = std_Math_min(indexEnd, indexPos + 32);

    var intermediate = intermediates[sliceId - 1];
    for (; indexPos < indexEnd; indexPos++) {
      UnsafePutElements(buffer, indexPos, func(intermediate, buffer[indexPos]),
                        info, ((sliceId << 2) + 2), indexPos + 1);
    }

    return indexEnd == info[((sliceId << 2) + 1)];
  }

  return undefined;
}
function ParallelArrayScatter(targets, defaultValue, conflictFunc, length, mode) {




  var self = this;

  if (length === undefined)
    length = self.shape[0];
  var targetsLength = std_Math_min(targets.length, self.shape[0]);

  if (targetsLength >>> 0 !== targetsLength)
    ThrowError(304, ".prototype.scatter length");

  if (length >>> 0 !== length)
    ThrowError(304, ".prototype.scatter length");

  parallel: for (;;) {
    if (ShouldForceSequential())
      break parallel;
    if (!((!mode || mode.mode !== "seq")))
      break parallel;

    if (forceDivideScatterVector())
      return parDivideScatterVector();
    else if (forceDivideOutputRange())
      return parDivideOutputRange();
    else if (conflictFunc === undefined && targetsLength < length)
      return parDivideOutputRange();
    return parDivideScatterVector();
  }


  do { if (mode) AssertSequentialIsOK(mode) } while(false);
  return seq();

  function forceDivideScatterVector() {
    return mode && mode.strategy && mode.strategy == "divide-scatter-vector";
  }

  function forceDivideOutputRange() {
    return mode && mode.strategy && mode.strategy == "divide-output-range";
  }

  function collide(elem1, elem2) {
    if (conflictFunc === undefined)
      ThrowError(308);

    return conflictFunc(elem1, elem2);
  }


  function parDivideOutputRange() {
    var chunks = ComputeNumChunks(targetsLength);
    var numSlices = ForkJoinSlices();
    var checkpoints = NewDenseArray(numSlices);
    for (var i = 0; i < numSlices; i++)
      UnsafePutElements(checkpoints, i, 0);

    var buffer = NewDenseArray(length);
    var conflicts = NewDenseArray(length);

    for (var i = 0; i < length; i++) {
      UnsafePutElements(buffer, i, defaultValue);
      UnsafePutElements(conflicts, i, false);
    }

    ForkJoin(fill, ForkJoinMode(mode));
    return NewParallelArray(ParallelArrayView, [length], buffer, 0);

    function fill(sliceId, numSlices, warmup) {
      var indexPos = checkpoints[sliceId];
      var indexEnd = targetsLength;
      if (warmup)
        indexEnd = std_Math_min(indexEnd, indexPos + 32);


      var [outputStart, outputEnd] = ComputeSliceBounds(length, sliceId, numSlices);

      for (; indexPos < indexEnd; indexPos++) {
        var x = self.get(indexPos);
        var t = checkTarget(indexPos, targets[indexPos]);
        if (t < outputStart || t >= outputEnd)
          continue;
        if (conflicts[t])
          x = collide(x, buffer[t]);
        UnsafePutElements(buffer, t, x, conflicts, t, true, checkpoints, sliceId, indexPos + 1);
      }

      return indexEnd == targetsLength;
    }

    return undefined;
  }

  function parDivideScatterVector() {





    var numSlices = ForkJoinSlices();
    var info = ComputeAllSliceBounds(targetsLength, numSlices);


    var localBuffers = NewDenseArray(numSlices);
    for (var i = 0; i < numSlices; i++)
      UnsafePutElements(localBuffers, i, NewDenseArray(length));
    var localConflicts = NewDenseArray(numSlices);
    for (var i = 0; i < numSlices; i++) {
      var conflicts_i = NewDenseArray(length);
      for (var j = 0; j < length; j++)
        UnsafePutElements(conflicts_i, j, false);
      UnsafePutElements(localConflicts, i, conflicts_i);
    }





    var outputBuffer = localBuffers[0];
    for (var i = 0; i < length; i++)
      UnsafePutElements(outputBuffer, i, defaultValue);

    ForkJoin(fill, ForkJoinMode(mode));
    mergeBuffers();
    return NewParallelArray(ParallelArrayView, [length], outputBuffer, 0);

    function fill(sliceId, numSlices, warmup) {
      var indexPos = info[((sliceId << 2) + 2)];
      var indexEnd = info[((sliceId << 2) + 1)];
      if (warmup)
        indexEnd = std_Math_min(indexEnd, indexPos + 32);

      var localbuffer = localBuffers[sliceId];
      var conflicts = localConflicts[sliceId];
      while (indexPos < indexEnd) {
        var x = self.get(indexPos);
        var t = checkTarget(indexPos, targets[indexPos]);
        if (conflicts[t])
          x = collide(x, localbuffer[t]);
        UnsafePutElements(localbuffer, t, x, conflicts, t, true,
                          info, ((sliceId << 2) + 2), ++indexPos);
      }

      return indexEnd == info[((sliceId << 2) + 1)];
    }






    function mergeBuffers() {
      var buffer = localBuffers[0];
      var conflicts = localConflicts[0];
      for (var i = 1; i < numSlices; i++) {
        var otherbuffer = localBuffers[i];
        var otherconflicts = localConflicts[i];
        for (var j = 0; j < length; j++) {
          if (otherconflicts[j]) {
            if (conflicts[j]) {
              buffer[j] = collide(otherbuffer[j], buffer[j]);
            } else {
              buffer[j] = otherbuffer[j];
              conflicts[j] = true;
            }
          }
        }
      }
    }

    return undefined;
  }

  function seq() {
    var buffer = NewDenseArray(length);
    var conflicts = NewDenseArray(length);

    for (var i = 0; i < length; i++) {
      UnsafePutElements(buffer, i, defaultValue);
      UnsafePutElements(conflicts, i, false);
    }

    for (var i = 0; i < targetsLength; i++) {
      var x = self.get(i);
      var t = checkTarget(i, targets[i]);
      if (conflicts[t])
        x = collide(x, buffer[t]);

      UnsafePutElements(buffer, t, x, conflicts, t, true);
    }

    return NewParallelArray(ParallelArrayView, [length], buffer, 0);
  }

  function checkTarget(i, t) {
    if (((t) | 0) !== t)
      ThrowError(345, i);

    if (t < 0 || t >= length)
      ThrowError(309);


    return ((t) | 0);
  }

  return undefined;
}





function ParallelArrayFilter(func, mode) {



  var self = this;
  var length = self.shape[0];

  parallel: for (;;) {
    if (ShouldForceSequential())
      break parallel;
    if (!((!mode || mode.mode !== "seq")))
      break parallel;

    var chunks = ComputeNumChunks(length);
    var numSlices = ForkJoinSlices();
    if (chunks < numSlices * 2)
      break parallel;

    var info = ComputeAllSliceBounds(chunks, numSlices);
    var counts = NewDenseArray(numSlices);
    for (var i = 0; i < numSlices; i++)
      UnsafePutElements(counts, i, 0);
    var survivors = NewDenseArray(chunks);
    ForkJoin(findSurvivorsInSlice, ForkJoinMode(mode));


    var count = 0;
    for (var i = 0; i < numSlices; i++)
      count += counts[i];
    var buffer = NewDenseArray(count);
    if (count > 0)
      ForkJoin(copySurvivorsInSlice, ForkJoinMode(mode));

    return NewParallelArray(ParallelArrayView, [count], buffer, 0);
  }


  do { if (mode) AssertSequentialIsOK(mode) } while(false);
  var buffer = [];
  for (var i = 0; i < length; i++) {
    var elem = self.get(i);
    if (func(elem, i, self))
      callFunction(std_Array_push, buffer, elem);;
  }
  return NewParallelArray(ParallelArrayView, [buffer.length], buffer, 0);







  function findSurvivorsInSlice(sliceId, numSlices, warmup) {
    var chunkPos = info[((sliceId << 2) + 2)];
    var chunkEnd = info[((sliceId << 2) + 1)];

    if (warmup && chunkEnd > chunkPos)
      chunkEnd = chunkPos + 1;

    var count = counts[sliceId];
    while (chunkPos < chunkEnd) {
      var indexStart = chunkPos << 5;
      var indexEnd = std_Math_min(indexStart + 32, length);
      var chunkBits = 0;

      for (var bit = 0; indexStart + bit < indexEnd; bit++) {
        var keep = !!func(self.get(indexStart + bit), indexStart + bit, self);
        chunkBits |= keep << bit;
        count += keep;
      }

      UnsafePutElements(survivors, chunkPos, chunkBits,
                        counts, sliceId, count,
                        info, ((sliceId << 2) + 2), ++chunkPos);
    }

    return chunkEnd == info[((sliceId << 2) + 1)];
  }

  function copySurvivorsInSlice(sliceId, numSlices, warmup) {






    var count = 0;
    if (sliceId > 0) {
      for (var i = 0; i < sliceId; i++)
        count += counts[i];
    }


    var total = count + counts[sliceId];
    if (count == total)
      return true;






    var chunkStart = info[((sliceId << 2) + 0)];
    var chunkEnd = info[((sliceId << 2) + 1)];
    for (var chunk = chunkStart; chunk < chunkEnd; chunk++) {
      var chunkBits = survivors[chunk];
      if (!chunkBits)
        continue;

      var indexStart = chunk << 5;
      for (var i = 0; i < 32; i++) {
        if (chunkBits & (1 << i)) {
          UnsafePutElements(buffer, count++, self.get(indexStart + i));
          if (count == total)
            break;
        }
      }
    }

    return true;
  }

  return undefined;
}
function ParallelArrayPartition(amount) {
  if (amount >>> 0 !== amount)
    ThrowError(304, "");

  var length = this.shape[0];
  var partitions = (length / amount) | 0;

  if (partitions * amount !== length)
    ThrowError(305);

  var shape = [partitions, amount];
  for (var i = 1; i < this.shape.length; i++)
    callFunction(std_Array_push, shape, this.shape[i]);;
  return NewParallelArray(ParallelArrayView, shape, this.buffer, this.offset);
}





function ParallelArrayFlatten() {
  if (this.shape.length < 2)
    ThrowError(307);

  var shape = [this.shape[0] * this.shape[1]];
  for (var i = 2; i < this.shape.length; i++)
    callFunction(std_Array_push, shape, this.shape[i]);;
  return NewParallelArray(ParallelArrayView, shape, this.buffer, this.offset);
}
function ParallelArrayGet1(i) {
  if (i === undefined)
    return undefined;
  return this.buffer[this.offset + i];
}




function ParallelArrayGet2(x, y) {
  var xDimension = this.shape[0];
  var yDimension = this.shape[1];
  if (x === undefined)
    return undefined;
  if (x >= xDimension)
    return undefined;
  if (y === undefined)
    return NewParallelArray(ParallelArrayView, [yDimension], this.buffer, this.offset + x * yDimension);
  if (y >= yDimension)
    return undefined;
  var offset = y + x * yDimension;
  return this.buffer[this.offset + offset];
}




function ParallelArrayGet3(x, y, z) {
  var xDimension = this.shape[0];
  var yDimension = this.shape[1];
  var zDimension = this.shape[2];
  if (x === undefined)
    return undefined;
  if (x >= xDimension)
    return undefined;
  if (y === undefined)
    return NewParallelArray(ParallelArrayView, [yDimension, zDimension],
                            this.buffer, this.offset + x * yDimension * zDimension);
  if (y >= yDimension)
    return undefined;
  if (z === undefined)
    return NewParallelArray(ParallelArrayView, [zDimension],
                            this.buffer, this.offset + y * zDimension + x * yDimension * zDimension);
  if (z >= zDimension)
    return undefined;
  var offset = z + y*zDimension + x * yDimension * zDimension;
  return this.buffer[this.offset + offset];
}




function ParallelArrayGetN(...coords) {
  if (coords.length == 0)
    return undefined;

  var products = ComputeProducts(this.shape);





  var offset = this.offset;
  var sDimensionality = this.shape.length;
  var cDimensionality = coords.length;
  for (var i = 0; i < cDimensionality; i++) {
    if (coords[i] >= this.shape[i])
      return undefined;
    offset += coords[i] * products[sDimensionality - i - 1];
  }

  if (cDimensionality < sDimensionality) {
    var shape = callFunction(std_Array_slice, this.shape, cDimensionality);
    return NewParallelArray(ParallelArrayView, shape, this.buffer, offset);
  }
  return this.buffer[offset];
}


function ParallelArrayLength() {
  return this.shape[0];
}

function ParallelArrayToString() {
  var l = this.length;
  if (l == 0)
    return "";

  var open, close;
  if (this.shape.length > 1) {
    open = "<";
    close = ">";
  } else {
    open = close = "";
  }

  var result = "";
  for (var i = 0; i < l - 1; i++) {
    result += open + String(this.get(i)) + close;
    result += ",";
  }
  result += open + String(this.get(l - 1)) + close;
  return result;
}





function AssertSequentialIsOK(mode) {
  if (mode && mode.mode && mode.mode !== "seq" && ParallelTestsShouldPass())
    ThrowError(344, "parallel execution", "sequential was forced");
}

function ForkJoinMode(mode) {

  if (!mode || !mode.mode) {
    return 0;
  } else if (mode.mode === "compile") {
    return 1;
  } else if (mode.mode === "par") {
    return 2;
  } else if (mode.mode === "recover") {
    return 3;
  } else if (mode.mode === "bailout") {
    return 4;
  }
  ThrowError(304, "");
  return undefined;
}
SetScriptHints(ParallelArrayConstructEmpty, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayConstructFromArray, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayConstructFromFunction, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayConstructFromFunctionMode, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayConstructFromComprehension, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayView, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayBuild, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayMap, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayReduce, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayScan, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayScatter, { cloneAtCallsite: true });
SetScriptHints(ParallelArrayFilter, { cloneAtCallsite: true });







SetScriptHints(ParallelArrayGet1, { cloneAtCallsite: true, inline: true });
SetScriptHints(ParallelArrayGet2, { cloneAtCallsite: true, inline: true });
SetScriptHints(ParallelArrayGet3, { cloneAtCallsite: true, inline: true });







var collatorCache = new Record();


function String_repeat(count) {

    CheckObjectCoercible(this);
    var S = ToString(this);


    var n = ToInteger(count);


    if (n < 0)
        ThrowError(170);

    if (!(n * S.length < (1 << 28)))
        ThrowError(146);


    n = n & ((1 << 28) - 1);


    var T = "";
    for (;;) {
        if (n & 1)
            T += S;
        n >>= 1;
        if (n)
            S += S;
        else
            break;
    }
    return T;
}





function String_iterator() {
    CheckObjectCoercible(this);
    var S = ToString(this);
    var iterator = NewStringIterator();
    UnsafeSetReservedSlot(iterator, 0, S);
    UnsafeSetReservedSlot(iterator, 1, 0);
    return iterator;
}

function StringIteratorIdentity() {
    return this;
}

function StringIteratorNext() {

    if (!IsObject(this) || !IsStringIterator(this))
        ThrowError(188, "StringIterator", "next", ToString(this));

    var S = UnsafeGetReservedSlot(this, 0);
    var index = UnsafeGetReservedSlot(this, 1);
    var size = S.length;

    if (index >= size) {
        return { value: undefined, done: true };
    }

    var charCount = 1;
    var first = callFunction(std_String_charCodeAt, S, index);
    if (first >= 0xD800 && first <= 0xDBFF && index + 1 < size) {
        var second = callFunction(std_String_charCodeAt, S, index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            charCount = 2;
        }
    }

    UnsafeSetReservedSlot(this, 1, index + charCount);
    var value = callFunction(std_String_substring, S, index, index + charCount);

    return { value: value, done: false };
}







function String_localeCompare(that) {

    CheckObjectCoercible(this);
    var S = ToString(this);
    var That = ToString(that);


    var locales = arguments.length > 1 ? arguments[1] : undefined;
    var options = arguments.length > 2 ? arguments[2] : undefined;


    var collator;
    if (locales === undefined && options === undefined) {


        if (collatorCache.collator === undefined)
            collatorCache.collator = intl_Collator(locales, options);
        collator = collatorCache.collator;
    } else {
        collator = intl_Collator(locales, options);
    }


    return intl_CompareStrings(collator, S, That);
}
function String_static_localeCompare(str1, str2) {
    if (arguments.length < 1)
        ThrowError(227, 0, "String.localeCompare");
    var locales = arguments.length > 2 ? arguments[2] : undefined;
    var options = arguments.length > 3 ? arguments[3] : undefined;
    return callFunction(String_localeCompare, str1, str2, locales, options);
}






function SetForEach(callbackfn, thisArg = undefined) {

    var S = this;
    if (!IsObject(S))
        ThrowError(5, typeof S);


    try {
        std_Set_has.call(S);
    } catch (e) {
        ThrowError(5, typeof S);
    }


    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));


    var values = std_Set_iterator.call(S);
    while (true) {
        var result = std_Set_iterator_next.call(values);
        if (result.done)
            break;
        var value = result.value;
        callFunction(callbackfn, thisArg, value, value, S);
    }
}
function DATUM_TYPE_REPR(obj) {

  return UnsafeGetReservedSlot(UnsafeGetReservedSlot(obj, 0), 0);
}
function TypedObjectPointer(typeRepr, typeObj, datum, offset) {
  this.typeRepr = typeRepr;
  this.typeObj = typeObj;
  this.datum = datum;
  this.offset = offset;
}

MakeConstructible(TypedObjectPointer, {});

TypedObjectPointer.fromTypedDatum = function(typed) {
  return new TypedObjectPointer(DATUM_TYPE_REPR(typed),
                                UnsafeGetReservedSlot(typed, 0),
                                typed,
                                0);
}







TypedObjectPointer.prototype.copy = function() {
  return new TypedObjectPointer(this.typeRepr, this.typeObj,
                                this.datum, this.offset);
};

TypedObjectPointer.prototype.reset = function(inPtr) {
  this.typeRepr = inPtr.typeRepr;
  this.typeObj = inPtr.typeObj;
  this.datum = inPtr.datum;
  this.offset = inPtr.offset;
  return this;
};

TypedObjectPointer.prototype.kind = function() {
  return ((UnsafeGetReservedSlot(this.typeRepr, 0)) | 0);
}

TypedObjectPointer.prototype.length = function() {
  switch (this.kind()) {
  case 4:
    return ((UnsafeGetReservedSlot(this.typeRepr, 3)) | 0);

  case 0:
    return ((UnsafeGetReservedSlot(this.datum, 2)) | 0);
  }
                                                     ;
  return 0;
}
TypedObjectPointer.prototype.moveTo = function(propName) {
  switch (this.kind()) {
  case 1:
  case 2:
  case 5:
    break;

  case 4:
  case 0:




    var index = ((propName) | 0);
    if (index === propName && index >= 0 && index < this.length())
      return this.moveToElem(index);
    break;

  case 3:
    if (callFunction(std_Object_hasOwnProperty, this.typeObj.fieldTypes, propName))
      return this.moveToField(propName);
    break;
  }

  ThrowError(363, propName);
  return undefined;
};




TypedObjectPointer.prototype.moveToElem = function(index) {


                                           ;

                                                     ;

                                                                 ;

  var elementTypeObj = this.typeObj.elementType;
  var elementTypeRepr = UnsafeGetReservedSlot(elementTypeObj, 0);
  this.typeRepr = elementTypeRepr;
  this.typeObj = elementTypeObj;
  var elementSize = ((UnsafeGetReservedSlot(elementTypeRepr, 1)) | 0);



  this.offset += std_Math_imul(index, elementSize);

  return this;
};




TypedObjectPointer.prototype.moveToField = function(propName) {

                                             ;

                                                    ;

  var fieldTypeObj = this.typeObj.fieldTypes[propName];
  var fieldOffset = ((this.typeObj.fieldOffsets[propName]) | 0);
  this.typeObj = fieldTypeObj;
  this.typeRepr = UnsafeGetReservedSlot(fieldTypeObj, 0);



  this.offset += fieldOffset;

  return this;
}
TypedObjectPointer.prototype.get = function() {
                                                                            ;

  switch (((UnsafeGetReservedSlot(this.typeRepr, 0)) | 0)) {
  case 1:
    return this.getScalar();

  case 2:
    return this.getReference();

  case 5:
    return this.getX4();

  case 4:
    return NewDerivedTypedDatum(this.typeObj, this.datum, this.offset);

  case 3:
    return NewDerivedTypedDatum(this.typeObj, this.datum, this.offset);

  case 0:
                                                                     ;
  }

                                                              ;
  return undefined;
}

TypedObjectPointer.prototype.getScalar = function() {
  var type = ((UnsafeGetReservedSlot(this.typeRepr, 3)) | 0);
  switch (type) {
  case 0:
    return Load_int8(this.datum, this.offset);

  case 1:
  case 8:
    return Load_uint8(this.datum, this.offset);

  case 2:
    return Load_int16(this.datum, this.offset);

  case 3:
    return Load_uint16(this.datum, this.offset);

  case 4:
    return Load_int32(this.datum, this.offset);

  case 5:
    return Load_uint32(this.datum, this.offset);

  case 6:
    return Load_float32(this.datum, this.offset);

  case 7:
    return Load_float64(this.datum, this.offset);
  }

                                                 ;
  return undefined;
}

TypedObjectPointer.prototype.getReference = function() {
  var type = ((UnsafeGetReservedSlot(this.typeRepr, 3)) | 0);
  switch (type) {
  case 0:
    return Load_Any(this.datum, this.offset);

  case 1:
    return Load_Object(this.datum, this.offset);

  case 2:
    return Load_string(this.datum, this.offset);
  }

                                                 ;
  return undefined;
}

TypedObjectPointer.prototype.getX4 = function() {
  var type = ((UnsafeGetReservedSlot(this.typeRepr, 3)) | 0);
  var T = GetTypedObjectModule();
  switch (type) {
  case 1:
    var x = Load_float32(this.datum, this.offset + 0);
    var y = Load_float32(this.datum, this.offset + 4);
    var z = Load_float32(this.datum, this.offset + 8);
    var w = Load_float32(this.datum, this.offset + 12);
    return T.float32x4(x, y, z, w);

  case 0:
    var x = Load_int32(this.datum, this.offset + 0);
    var y = Load_int32(this.datum, this.offset + 4);
    var z = Load_int32(this.datum, this.offset + 8);
    var w = Load_int32(this.datum, this.offset + 12);
    return T.int32x4(x, y, z, w);
  }

                                             ;
  return undefined;
}
TypedObjectPointer.prototype.set = function(fromValue) {
                                                                            ;

  var typeRepr = this.typeRepr;




  if (IsObject(fromValue) && ObjectIsTypedDatum(fromValue)) {
    if (!typeRepr.variable && DATUM_TYPE_REPR(fromValue) === typeRepr) {
      if (!ObjectIsAttached(fromValue))
        ThrowError(365);

      var size = ((UnsafeGetReservedSlot(typeRepr, 1)) | 0);
      Memcpy(this.datum, this.offset, fromValue, 0, size);
      return;
    }
  }

  switch (((UnsafeGetReservedSlot(typeRepr, 0)) | 0)) {
  case 1:
    this.setScalar(fromValue);
    return;

  case 2:
    this.setReference(fromValue);
    return;

  case 5:
    this.setX4(fromValue);
    return;

  case 4:
  case 0:
    if (!IsObject(fromValue))
      break;


    var length = this.length();
    if (fromValue.length !== length)
      break;


    if (length > 0) {
      var tempPtr = this.copy().moveToElem(0);
      var size = ((UnsafeGetReservedSlot(tempPtr.typeRepr, 1)) | 0);
      for (var i = 0; i < length; i++) {
        tempPtr.set(fromValue[i]);
        tempPtr.offset += size;
      }
    }
    return;

  case 3:
    if (!IsObject(fromValue))
      break;


    var tempPtr = this.copy();
    var fieldNames = this.typeObj.fieldNames;
    for (var i = 0; i < fieldNames.length; i++) {
      var fieldName = fieldNames[i];
      tempPtr.reset(this).moveToField(fieldName).set(fromValue[fieldName]);
    }
    return;
  }

  ThrowError(38,
             typeof(fromValue),
             this.typeRepr.toSource());
}


TypedObjectPointer.prototype.setScalar = function(fromValue) {

                                            ;

  var type = ((UnsafeGetReservedSlot(this.typeRepr, 3)) | 0);
  switch (type) {
  case 0:
    return Store_int8(this.datum, this.offset,
                     ((fromValue) | 0) & 0xFF);

  case 1:
    return Store_uint8(this.datum, this.offset,
                      ((fromValue) >>> 0) & 0xFF);

  case 8:
    var v = ClampToUint8(+fromValue);
    return Store_int8(this.datum, this.offset, v);

  case 2:
    return Store_int16(this.datum, this.offset,
                      ((fromValue) | 0) & 0xFFFF);

  case 3:
    return Store_uint16(this.datum, this.offset,
                       ((fromValue) >>> 0) & 0xFFFF);

  case 4:
    return Store_int32(this.datum, this.offset,
                      ((fromValue) | 0));

  case 5:
    return Store_uint32(this.datum, this.offset,
                       ((fromValue) >>> 0));

  case 6:
    return Store_float32(this.datum, this.offset, +fromValue);

  case 7:
    return Store_float64(this.datum, this.offset, +fromValue);
  }

                                                 ;
  return undefined;
}

TypedObjectPointer.prototype.setReference = function(fromValue) {
  var type = ((UnsafeGetReservedSlot(this.typeRepr, 3)) | 0);
  switch (type) {
  case 0:
    return Store_Any(this.datum, this.offset, fromValue);

  case 1:
    var value = (fromValue === null ? fromValue : ToObject(fromValue));
    return Store_Object(this.datum, this.offset, value);

  case 2:
    return Store_string(this.datum, this.offset, ToString(fromValue));
  }

                                                 ;
  return undefined;
}


TypedObjectPointer.prototype.setX4 = function(fromValue) {




  ThrowError(38,
             typeof(fromValue),
             this.typeRepr.toSource());
}







function ConvertAndCopyTo(destTypeRepr,
                          destTypeObj,
                          destDatum,
                          destOffset,
                          fromValue)
{

                                           ;

                                          ;

                                            ;

  if (!ObjectIsAttached(destDatum))
    ThrowError(365);

  var ptr = new TypedObjectPointer(destTypeRepr, destTypeObj,
                                   destDatum, destOffset);
  ptr.set(fromValue);
}


function Reify(sourceTypeRepr,
               sourceTypeObj,
               sourceDatum,
               sourceOffset) {

                                ;

                               ;

                                 ;

  if (!ObjectIsAttached(sourceDatum))
    ThrowError(365);

  var ptr = new TypedObjectPointer(sourceTypeRepr, sourceTypeObj,
                                   sourceDatum, sourceOffset);

  return ptr.get();
}

function FillTypedArrayWithValue(destArray, fromValue) {
  var typeRepr = DATUM_TYPE_REPR(destArray);
  var length = ((UnsafeGetReservedSlot(typeRepr, 3)) | 0);
  if (length === 0)
    return;


  var ptr = TypedObjectPointer.fromTypedDatum(destArray);
  ptr.moveToElem(0);
  ptr.set(fromValue);


  var elementSize = ((UnsafeGetReservedSlot(ptr.typeRepr, 1)) | 0);
  var totalSize = length * elementSize;
  for (var offset = elementSize; offset < totalSize; offset += elementSize)
    Memcpy(destArray, offset, destArray, 0, elementSize);
}


function TypeObjectEquivalent(otherTypeObj) {
  if (!IsObject(this) || !ObjectIsTypeObject(this))
    ThrowError(364, "this", "type object");
  if (!IsObject(otherTypeObj) || !ObjectIsTypeObject(otherTypeObj))
    ThrowError(364, "1", "type object");
  return UnsafeGetReservedSlot(this, 0) === UnsafeGetReservedSlot(otherTypeObj, 0);
}
function TypedArrayRedimension(newArrayType) {
  if (!IsObject(this) || !ObjectIsTypedDatum(this))
    ThrowError(364, "this", "typed array");

  if (!IsObject(newArrayType) || !ObjectIsTypeObject(newArrayType))
    ThrowError(364, 1, "type object");



  var oldArrayType = UnsafeGetReservedSlot(this, 0);
  var oldArrayReprKind = ((UnsafeGetReservedSlot(UnsafeGetReservedSlot(oldArrayType, 0), 0)) | 0);
  var oldElementType = oldArrayType;
  var oldElementCount = 1;
  switch (oldArrayReprKind) {
  case 0:
    oldElementCount *= this.length;
    oldElementType = oldElementType.elementType;
    break;

  case 4:
    break;

  default:
    ThrowError(364, "this", "typed array");
  }
  while (((UnsafeGetReservedSlot(UnsafeGetReservedSlot(oldElementType, 0), 0)) | 0) === 4) {
    oldElementCount *= oldElementType.length;
    oldElementType = oldElementType.elementType;
  }



  var newElementType = newArrayType;
  var newElementCount = 1;
  while (((UnsafeGetReservedSlot(UnsafeGetReservedSlot(newElementType, 0), 0)) | 0) == 4) {
    newElementCount *= newElementType.length;
    newElementType = newElementType.elementType;
  }


  if (oldElementCount !== newElementCount) {
    ThrowError(364, 1,
               "New number of elements does not match old number of elements");
  }


  if (UnsafeGetReservedSlot(oldElementType, 0) !== UnsafeGetReservedSlot(newElementType, 0)) {
    ThrowError(364, 1,
               "New element type is not equivalent to old element type");
  }




                                      ;


  return NewDerivedTypedDatum(newArrayType, this, 0);
}
function HandleCreate(obj, ...path) {
  if (!IsObject(this) || !ObjectIsTypeObject(this))
    ThrowError(8, "Type", "handle", "value");

  switch (((UnsafeGetReservedSlot(UnsafeGetReservedSlot(this, 0), 0)) | 0)) {
  case 1:
  case 2:
  case 5:
  case 4:
  case 3:
    break;

  case 0:
    ThrowError(381);
  }

  var handle = NewTypedHandle(this);

  if (obj !== undefined)
    HandleMoveInternal(handle, obj, path)

  return handle;
}



function HandleMove(handle, obj, ...path) {
  if (!IsObject(handle) || !ObjectIsTypedHandle(handle))
    ThrowError(8, "Handle", "set", typeof value);

  HandleMoveInternal(handle, obj, path);
}

function HandleMoveInternal(handle, obj, path) {

                                                ;

  if (!IsObject(obj) || !ObjectIsTypedDatum(obj))
    ThrowError(8, "Handle", "set", "value");

  var ptr = TypedObjectPointer.fromTypedDatum(obj);
  for (var i = 0; i < path.length; i++)
    ptr.moveTo(path[i]);


  if (ptr.typeRepr !== DATUM_TYPE_REPR(handle))
    ThrowError(366);

  AttachHandle(handle, ptr.datum, ptr.offset)
}



function HandleGet(handle) {
  if (!IsObject(handle) || !ObjectIsTypedHandle(handle))
    ThrowError(8, "Handle", "set", typeof value);

  if (!ObjectIsAttached(handle))
    ThrowError(365);

  var ptr = TypedObjectPointer.fromTypedDatum(handle);
  return ptr.get();
}



function HandleSet(handle, value) {
  if (!IsObject(handle) || !ObjectIsTypedHandle(handle))
    ThrowError(8, "Handle", "set", typeof value);

  if (!ObjectIsAttached(handle))
    ThrowError(365);

  var ptr = TypedObjectPointer.fromTypedDatum(handle);
  ptr.set(value);
}



function HandleTest(obj) {
  return IsObject(obj) && ObjectIsTypedHandle(obj);
}




function X4ProtoString(type) {
  switch (type) {
  case 0:
    return "int32x4";
  case 1:
    return "float32x4";
  }

                                          ;
  return undefined;
}

var X4LaneStrings = ["x", "y", "z", "w"];




function X4GetLane(datum, type, lane) {
  if (!IsObject(datum) || !ObjectIsTypedDatum(datum))
    ThrowError(8, X4ProtoString(type),
               X4LaneStrings[lane], typeof this);

  var repr = DATUM_TYPE_REPR(datum);
  if (((UnsafeGetReservedSlot(repr, 0)) | 0) != 5 || ((UnsafeGetReservedSlot(repr, 3)) | 0) != type)
    ThrowError(8, X4ProtoString(type),
               X4LaneStrings[lane], typeof this);

  switch (type) {
  case 0:
    return Load_int32(datum, lane * 4);
  case 1:
    return Load_float32(datum, lane * 4);
  }

                                          ;
  return undefined;
}

function Float32x4Lane0() { return X4GetLane(this, 1, 0); }
function Float32x4Lane1() { return X4GetLane(this, 1, 1); }
function Float32x4Lane2() { return X4GetLane(this, 1, 2); }
function Float32x4Lane3() { return X4GetLane(this, 1, 3); }

function Int32x4Lane0() { return X4GetLane(this, 0, 0); }
function Int32x4Lane1() { return X4GetLane(this, 0, 1); }
function Int32x4Lane2() { return X4GetLane(this, 0, 2); }
function Int32x4Lane3() { return X4GetLane(this, 0, 3); }

function X4ToSource() {
  if (!IsObject(this) || !ObjectIsTypedDatum(this))
    ThrowError(8, "X4", "toSource", typeof this);

  var repr = DATUM_TYPE_REPR(this);
  if (((UnsafeGetReservedSlot(repr, 0)) | 0) != 5)
    ThrowError(8, "X4", "toSource", typeof this);

  var type = ((UnsafeGetReservedSlot(repr, 3)) | 0);
  return X4ProtoString(type)+"("+this.x+", "+this.y+", "+this.z+", "+this.w+")";
}
function ArrayShorthand(...dims) {
  if (!IsObject(this) || !ObjectIsTypeObject(this))
    ThrowError(364,
               "this", "typed object");

  var T = GetTypedObjectModule();

  if (dims.length == 0)
    return new T.ArrayType(this);

  var accum = this;
  for (var i = dims.length - 1; i >= 0; i--)
    accum = new T.ArrayType(accum).dimension(dims[i]);
  return accum;
}


function TypeOfTypedDatum(obj) {
  if (IsObject(obj) && ObjectIsTypedDatum(obj))
    return UnsafeGetReservedSlot(obj, 0);







  var T = GetTypedObjectModule();
  switch (typeof obj) {
    case "object": return T.Object;
    case "function": return T.Object;
    case "string": return T.String;
    case "number": return T.float64;
    case "undefined": return T.Any;
    default: return T.Any;
  }
}

function ObjectIsTypedDatum(obj) {

  return ObjectIsTypedObject(obj) || ObjectIsTypedHandle(obj);
}

function ObjectIsAttached(obj) {


                                                     ;
  return UnsafeGetReservedSlot(obj, 1) != null;
}

