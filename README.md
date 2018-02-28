![WiM](wimlogo.png)


# STNPublicInfo

AngularJS application. Public page accessed via FEV to show site information along with hwm or sensor information and site files.

### Prerequisites

##### required software
[node.js](http://nodejs.org)  
[git](https://git-scm.com/)  

Install global dependencies
```bash
npm install -g bower
npm install -g gulp
npm install -g typings
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

https://help.github.com/articles/cloning-a-repository/

Inside of your project folder (after git fork and clone):
```
npm install
bower install
typings install 
```

## Building and testing

Explain how to run the debugging 'watch' script for this repo, if applicable

Explain how to run unit tests, if applicable

## Deployment

Add additional notes about how to deploy this on a live system. **Do not include any credentials, IP addresses, or other sensitive information**

## Built With

* [AngularJS](https://angularjs.org/) - The main web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests to us. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on adhering by the [USGS Code of Scientific Conduct](https://www2.usgs.gov/fsp/fsp_code_of_scientific_conduct.asp).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](../../tags). 

**Commit, Sync, and Merge Pull Request on any current project changes.  The steps below require a clean git status.**

##### Step 1.
Bump the version.  Run only one of the below commands.  
This creates a local commit with the package.json, and bower.json updated to the new version number

```
gulp patch     # makes v0.1.0 → v0.1.1
gulp feature   # makes v0.1.1 → v0.2.0
gulp release   # makes v0.2.1 → v1.0.0
```

##### Step 2.   
 Push the commit that contains the json files with bumped versions to your personal github repo 
 
```
git add .
git commit -m "bump version"
git push origin staging
```

##### Step 3.   
 Create and merge pull request to master with version incremented (github.com)

##### Step 4.  
Create new release on github.com

To push tags to remote origin: `git push origin --tags`

*Note that your alias for the remote origin may differ.

## Authors

* **[Blake Draper](https://github.com/BlakeDraper)**  - *Point of Contact* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)
Mapping](https://wim.usgs.gov/)
* **[Tonia Roddick](https://github.com/troddick)**  - *Developer*

See also the list of [contributors](../../graphs/contributors) who participated in this project.

## License

This project is licensed under the Creative Commons CC0 1.0 Universal License - see the [LICENSE.md](LICENSE.md) file for details

## Suggested Citation
In the spirit of open source, please cite any re-use of the source code stored in this repository. Below is the suggested citation:

`This project contains code produced by the Web Informatics and Mapping (WIM) team at the United States Geological Survey (USGS). As a work of the United States Government, this project is in the public domain within the United States. https://wim.usgs.gov`


## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration Note 

## About WIM
* This project authored by the [USGS WIM team](https://wim.usgs.gov)
* WIM is a team of developers and technologists who build and manage tools, software, web services, and databases to support USGS science and other federal government cooperators.
* WIM is a part of the [Upper Midwest Water Science Center](https://www.usgs.gov/centers/wisconsin-water-science-center).
