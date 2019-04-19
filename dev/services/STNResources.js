(function () {
    "use strict";

    //look up common service module, and register the new factory with that module 
    var STNResource = angular.module('STNResource', ['ngResource']);
    var rootURL = "https://stntest.wim.usgs.gov/stnservices";
   
    //#region GEOCODE https://geocoding.geo.census.gov/geocoder/geographies/coordinates?benchmark=4&vintage=4&format=json
    STNResource.factory('GEOCODE', ['$resource', function ($resource) {
        return $resource(rootURL + '/Geocode/location',
            {}, {
                getAddressParts: { method: 'GET', params: { Latitude: '@Latitude', Longitude: '@Longitude' } } //y=28.35975&x=-81.421988
            });
    }]);
    //#endregion of GEOCODE

    //#region AGENCY
    STNResource.factory('AGENCY', ['$resource', function ($resource) {
        return $resource(rootURL + '/Agencies/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }               
            });
    }]);
    //#endregion of AGENCY    

    //#region COUNTIES
    STNResource.factory('COUNTIES', ['$resource', function ($resource) {
        return $resource(rootURL + '/Counties/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },
                update: { method: 'PUT', cache: false, isArray: false },
                save: { method: 'POST', cache: false, isArray: false },
                delete: { method: 'DELETE', cache: false, isArray: false }
            });
    }]);
    //#endregion of COUNTIES

    //#region DATA_FILE
    STNResource.factory('DATA_FILE', ['$resource', function ($resource) {
        return $resource(rootURL + '/DataFiles/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },
                getDFApproval: { method: 'GET', cache: false, isArray: false, url: rootURL + '/DataFiles/:id/Approval.json' },
                getUnapprovedDFs: { method: 'GET', isArray: true, cache: false }, //?IsApproved={approved}&Event={eventId}&Processor={memberId}&State={state}
                approveNWISDF: { method: 'POST', cache: false, isArray: false, params: { id: '@id' }, url: rootURL + '/datafiles/:id/NWISApprove.json' } //posts an APPROVAL (using EventCoord), updates the data file with approval_id and returns APPROVAL  
            });
    }]);
    //#endregion of DATA_FILE

    //#region DEPLOYMENT_PRIORITY
    STNResource.factory('DEPLOYMENT_PRIORITY', ['$resource', function ($resource) {
        return $resource(rootURL + '/DeploymentPriorities/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }                
            });
    }]);
    //#endregion of DEPLOYMENT_PRIORITY

    //#region DEPLOYMENT_TYPE
    STNResource.factory('DEPLOYMENT_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/DeploymentTypes/:id.json',
            {}, {
                query: {},
                getDepSensType: { method: 'GET', isArray: false, url: rootURL + '/DeploymentTypes/:id/SensorType.json' },
                getAll: { method: 'GET', isArray: true }                
            });
    }]);
    //#endregion of DEPLOYMENT_TYPE

    //#region EVENT_STATUS
    STNResource.factory('EVENT_STATUS', ['$resource', function ($resource) {
        return $resource(rootURL + '/EventStatus/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }                
            });
    }]);
    //#endregion of EVENT_STATUS

    //#region EVENT_TYPE
    STNResource.factory('EVENT_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/EventTypes/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of EVENT_TYPE

    //#region FILE_TYPE
    STNResource.factory('FILE_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/FileTypes/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },
                update: { method: 'PUT', cache: false, isArray: false }
            });
    }]);
    //#endregion of FILE_TYPE

    //#region EVENT
    STNResource.factory('EVENT', ['$resource', function ($resource) {
        return $resource(rootURL + '/Events/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },
                getEventSites: { method: 'GET', isArray: true, url: rootURL + '/Events/:id/Sites.json' },
                getFilteredEvents: { method: 'GET', isArray: true, url: rootURL + '/Events/FilteredEvents.json' } //?Date: null, Type: 0, State: null                
            });
    }]);
    //#endregion of EVENT

    //#region FILE
    STNResource.factory('FILE', ['$resource', function ($resource) {
        return $resource(rootURL + '/Files/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },
                getFileItem: { method: 'GET', isArray: false, url: rootURL + '/Files/:id/Item' }                
            });
    }]);
    //#endregion of FILE

    //#region HORIZONTAL_COLL_METHODS
    STNResource.factory('HORIZONTAL_COLL_METHODS', ['$resource', function ($resource) {
        return $resource(rootURL + '/HorizontalMethods/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of HORIZONTAL_COLL_METHODS

    //#region HORIZONTAL_DATUM
    STNResource.factory('HORIZONTAL_DATUM', ['$resource', function ($resource) {
        return $resource(rootURL + '/HorizontalDatums/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of HORIZONTAL_DATUM

    //#region HOUSING_TYPE
    STNResource.factory('HOUSING_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/HousingTypes/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of HOUSING_TYPE

    //#region HWM
    STNResource.factory('HWM', ['$resource', function ($resource) {
        return $resource(rootURL + '/hwms/:id.json',
            {}, {
                query: {},
                getFilteredHWMs: { method: 'GET', isArray: true, url: rootURL + '/HWMs/FilteredHWMs.json' }, //Event={eventIds}&EventType={eventTypeIDs}&EventStatus={eventStatusID}&States={states}&County={counties}&HWMType={hwmTypeIDs}&HWMQuality={hwmQualIDs}&HWMEnvironment={hwmEnvironment}&SurveyComplete={surveyComplete}&StillWater={stillWater}
                getHWMFiles: { method: 'GET', isArray: true, url: rootURL + '/HWMs/:id/Files.json' },
                getUnapprovedHWMs: { method: 'GET', isArray: true, cache: false }, //IsApproved={'true'/'false'}&Event={eventId}&Member={memberId}&State={state}
                getHWMApproval: { method: 'GET', cache: false, isArray: false, url: rootURL + '/hwms/:id/Approval.json' },                
            });
    }]);
    //#endregion of HWM

    //#region HWM_QUALITY
    STNResource.factory('HWM_QUALITY', ['$resource', function ($resource) {
        return $resource(rootURL + '/HWMQualities/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of HWM_QUALITY

    //#region HWM_TYPE
    STNResource.factory('HWM_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/HWMTypes/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of HWM_TYPE

    //#region INSTRUMENT
    STNResource.factory('INSTRUMENT', ['$resource', function ($resource) {
        return $resource(rootURL + '/Instruments/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },
                getstatusInstruments: { method: 'GET', isArray: true, url: rootURL + '/Instruments.json/' }, //CurrentStatus: 1, Event: $scope.evID 
                getInstrumentFiles: {method: 'GET', isArray: true, url: rootURL + '/Instruments/:id/Files.json'},
                getFullInstrument: { method: 'GET', url: rootURL + '/Instruments/:id/FullInstrument.json' }, //gets instrument and it's stats together
                getInstrumentStatus: { method: 'GET', url: rootURL + '/Instruments/:id/InstrumentStatus.json' }
            });
    }]);
    //#endregion of INSTRUMENT

    //#region INSTRUMENT_STATUS
    STNResource.factory('INSTRUMENT_STATUS', ['$resource', function ($resource) {
        return $resource(rootURL + '/InstrumentStatus/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of INSTRUMENT

    //#region INST_COLL_CONDITION
    STNResource.factory('INST_COLL_CONDITION', ['$resource', function ($resource) {
        return $resource(rootURL + '/InstrCollectConditions/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of INST_COLL_CONDITION

    //#region LANDOWNER_CONTACT
    STNResource.factory('LANDOWNER_CONTACT', ['$resource', function ($resource) {
        return $resource(rootURL + '/LandOwners/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of LANDOWNER_CONTACT

    //#region Map_Site
    STNResource.factory('Map_Site', ['SITE', '$rootScope', '$cookies', function (SITE, $rootScope, $cookies) {
        var MapSiteParts = [];

        return {
            getMapSiteParts: function () {
                return MapSiteParts;
            },
            setMapSiteParts: function (siteId) {
                MapSiteParts = [];
                SITE.query({ id: siteId }).$promise.then(function (response) {
                    MapSiteParts.push(response);
                    SITE.getSitePeaks({ id: siteId }).$promise.then(function (pResponse) {
                        MapSiteParts.push(pResponse);
                        $rootScope.$broadcast('mapSiteClickResults', MapSiteParts);
                        //$rootScope.stateIsLoading.showLoading = false;
                    });
                });
            }
        };
    }]);
    //#endregion of Map_Site

    //#region Map_filter
    STNResource.factory('Map_Filter', ['$rootScope', function ($rootScope) {
        var filteredSites = [];

        return {
            // getFilteredSites: function () {
            //     return filteredSites;
            // },
            setFilteredSites: function (sitesArray) {
                filteredSites = sitesArray;
                $rootScope.$broadcast('filterSitesClick', filteredSites);
            }
        };
    }]);
    //#endregion of Map_Filter

    //#region MARKER
    STNResource.factory('MARKER', ['$resource', function ($resource) {
        return $resource(rootURL + '/Markers/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of MARKER

    //#region MEMBER
    STNResource.factory('MEMBER', ['$resource', function ($resource) {
        return $resource(rootURL + '/Members/:id.json',
            {}, {
                query: {},
                getMemberName: { method: 'GET', isArray: false, transformResponse: function (data) { return { list: angular.fromJson(data) } }, url: rootURL + '/Members/GetMemberName/:id.json'},
                getAll: { method: 'GET', isArray: true },
                getRoleMembers: { method: 'GET', isArray: true, url: rootURL + '/Roles/:roleId/Members.json' },
                getEventPeople: { method: 'GET', isArray: true, url: rootURL + '/Events/:Eventid/Members.json' }
            });
    }]);
    //#endregion of MEMBER

    //#region NETWORK_NAME
    STNResource.factory('NETWORK_NAME', ['$resource', function ($resource) {
        return $resource(rootURL + '/NetworkNames/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of NETWORK_NAME

    //#region NETWORK_TYPE
    STNResource.factory('NETWORK_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/NetworkTypes/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of NETWORK_TYPE

    //#region OBJECTIVE_POINT
    STNResource.factory('OBJECTIVE_POINT', ['$resource', function ($resource) {
        return $resource(rootURL + '/ObjectivePoints/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },                
                getOPFiles: { method: 'GET', isArray: true, url: rootURL + "/ObjectivePoints/:id/Files" },
                getOPControls: { method: 'GET', cache: false, isArray: true, url: rootURL + "/ObjectivePoints/:id/OPControls.json" }                
            });
    }]);
    //#endregion of OBJECTIVE_POINT

    //#region OP_CONTROL_IDENTIFIER
    STNResource.factory('OP_CONTROL_IDENTIFIER', ['$resource', function ($resource) {
        return $resource(rootURL + '/OPControlIdentifiers/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }               
            });
    }]);
    //#endregion of OP_CONTROL_IDENTIFIER

    //#region OP_MEASURE
    STNResource.factory('OP_MEASURE', ['$resource', function ($resource) {
        return $resource(rootURL + '/OPMeasurements/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },
                getInstStatOPMeasures: { method: 'GET', isArray: true, url: rootURL + '/InstrumentStatus/:instrumentStatusId/OPMeasurements' },
                getDatumLocationOPMeasures: { method: 'GET', isArray: true, url: rootURL + '/ObjectivePoints/:objectivePointId/OPMeasurements' }                
            });
    }]);
    //#endregion of OP_MEASURE

    //#region OP_QUALITY
    STNResource.factory('OP_QUALITY', ['$resource', function ($resource) {
        return $resource(rootURL + '/ObjectivePointQualities/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of OP_QUALITY

    //#region OP_TYPE
    STNResource.factory('OP_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/OPTypes/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of OP_TYPE

    //#region PEAK
    STNResource.factory('PEAK', ['$resource', function ($resource) {
        return $resource(rootURL + '/PeakSummaries/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true },
                getPeakSummaryDFs: { method: 'GET', isArray: true, cache: false, url: rootURL + '/PeakSummaries/:id/DataFiles.json' },
                getPeakSummaryHWMs: { method: 'GET', isArray: true, cache: false, url: rootURL + '/PeakSummaries/:id/HWMs.json' }
            });
    }]);
    //#endregion of PEAK

    //#region ROLE
    STNResource.factory('ROLE', ['$resource', function ($resource) {
        return $resource(rootURL + '/Roles/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of ROLE

    //#region SENSOR_BRAND
    STNResource.factory('SENSOR_BRAND', ['$resource', function ($resource) {
        return $resource(rootURL + '/SensorBrands/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of SENSOR_BRAND

    //#region SENSOR_TYPE
    STNResource.factory('SENSOR_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/SensorTypes/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }, //this returns sensortypes with list of deploymenttypes for each one
                getSensorDeploymentTypes: { method: 'GET', isArray: true, url: rootURL + '/SensorTypes/:id/DeploymentTypes.json' }                 
            });
    }]);
    //#endregion of SENSOR_TYPE

    //#region SITE
    STNResource.factory('SITE', ['$resource', function ($resource) {
        return $resource(rootURL + '/Sites/:id.json',
            {}, {
                query: {},
                getProximitySites: { method: 'GET', isArray: true, params: { Latitude: '@latitude', Longitude: '@longitude', Buffer: '@buffer' } },
                getAll: { method: 'GET', isArray: true },
                getSearchedSite: { method: 'GET', isArray: false, url: rootURL + '/Sites/Search' }, //?bySiteNo={siteNo}&bySiteName={siteName}&bySiteId={siteId} (only going to populate 1 of these params
                getFilteredSites: { method: 'GET', isArray: true, url: rootURL + '/Sites/FilteredSites.json' }, //accepts optional parameters: Event={eventId}&State={stateNames}&SensorType={sensorTypeId}&NetworkName={networkNameId}&OPDefined={opDefined}&HWMOnly={hwmOnlySites}
                //landowner
                getSiteLandOwner: { method: 'GET', url: rootURL + '/Sites/:id/LandOwner.json' },
                //Site NetworkTypes
                getSiteNetworkTypes: { method: 'GET', isArray: true, url: rootURL + '/sites/:id/networkTypes.json' },
                //Site Network Names
                getSiteNetworkNames: { method: 'GET', isArray: true, url: rootURL + '/sites/:id/networkNames.json' },
                //Site Housings
                getSiteHousings: { method: 'GET', isArray: true, url: rootURL + '/sites/:id/SiteHousings.json' },
                //  postSiteHousing: {method: 'POST', cache: false, isArray:true, url: rootURL + '/site/:id/AddSiteSiteHousing.json'},
                //Site Parts
                getSiteOPs: { method: 'GET', isArray: true, url: rootURL + '/Sites/:id/ObjectivePoints.json' },
                getSiteSensors: { method: 'GET', isArray: true, url: rootURL + '/Sites/:id/SiteFullInstrumentList.json' }, //all instruments and their stats together
                getSiteHWMs: { method: 'GET', isArray: true, url: rootURL + '/Sites/:id/HWMs.json' },
                getSiteFiles: { method: 'GET', isArray: true, url: rootURL + '/Sites/:id/Files.json' },
                getSitePeaks: { method: 'GET', isArray: true, url: rootURL + '/Sites/:id/PeakSummaryView.json' }                
            });
    }]);
    //#endregion of SITE
   
    //#region STATE
    STNResource.factory('STATE', ['$resource', function ($resource) {
        return $resource(rootURL + '/States/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }               
            });
    }]);
    //#endregion of STATE

    //#region SITE_HOUSING
    STNResource.factory('SITE_HOUSING', ['$resource', function ($resource) {
        return $resource(rootURL + '/SiteHousings/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of SITE_HOUSING

    //#region STATUS_TYPE
    STNResource.factory('STATUS_TYPE', ['$resource', function ($resource) {
        return $resource(rootURL + '/StatusTypes/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of STATUS_TYPE

    //#region SOURCE
    STNResource.factory('SOURCE', ['$resource', function ($resource) {
        return $resource(rootURL + '/Sources/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
               
            });
    }]);
    //#endregion of SOURCE

    //#region VERTICAL_COLL_METHOD
    STNResource.factory('VERTICAL_COLL_METHOD', ['$resource', function ($resource) {
        return $resource(rootURL + '/VerticalMethods/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of VERTICAL_COLL_METHOD

    //#region VERTICAL_DATUM
    STNResource.factory('VERTICAL_DATUM', ['$resource', function ($resource) {
        return $resource(rootURL + '/VerticalDatums/:id.json',
            {}, {
                query: {},
                getAll: { method: 'GET', isArray: true }
            });
    }]);
    //#endregion of VERTICAL_DATUM

})();