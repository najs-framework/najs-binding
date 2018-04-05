## Najs Binding

> A simple and powerful dependency injection, service container, instance resolver for Node applications

[![Travis](https://img.shields.io/travis/najs-framework/najs-binding/master.svg?style=flat-square)](https://travis-ci.org/najs-framework/najs-binding/builds)
[![Maintainability](https://api.codeclimate.com/v1/badges/64b3477c2a139bfcace4/maintainability)](https://codeclimate.com/github/najs-framework/najs-binding/maintainability)
[![Coverage Status](https://img.shields.io/coveralls/najs-framework/najs-binding/master.svg?style=flat-square)](https://coveralls.io/r/najs-framework/najs-binding?branch=master)
[![node version](https://img.shields.io/node/v/najs-binding.svg?style=flat-square)](https://nodejs.org/en/download/)
[![npm version](https://img.shields.io/npm/v/najs-binding.svg?style=flat-square)](http://badge.fury.io/js/najs-binding)
[![npm downloads](https://img.shields.io/npm/dm/najs-binding.svg?style=flat-square)](http://badge.fury.io/js/najs-binding)
[![npm license](https://img.shields.io/npm/l/najs-binding.svg?style=flat-square)](http://badge.fury.io/js/najs-binding)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

### What is Service Container?

The Service container is a powerful tool for managing class dependencies and performing dependency injection.

For example, suppose you have a simple `UserService` class that contains all `users` from database:

```javascript
// written in Javascript
class UserService {
  @autoload('UserRepository') userRepository

  getUsers() {
    return this.userRepository.getUsers()
  }
}
```

In this example, the UserService needs to retrieve users from a data source. So, we will inject a repository
that is able to retrieve users. Since the repository is injected, we are able to easily swap it out with another
implementation. We are also able to easily "mock", or create a dummy implementation of the UserRepository when
testing our application.

### Usage

### API

#### register()

#### make()

#### bind()

#### @autoload()

#### ClassRegistry

### License

MIT @ Nhat Phan

```

```
