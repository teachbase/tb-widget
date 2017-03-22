# Teachbase Widget

## Installation

```bash
yarn install
```

## Running Dev Server

```bash
yarn dev
```
Runs the app in the development mode.<br>

## Building for Production

```bash
yarn build
```
Builds the app for production to the `dist` folder.<br>

## Usage:
```
<div id="tb_widget">
  <script type="text/javascript" src="PATH_TO_SCRIPT"></script>
  <script>
    new TBWidget({
      type: 'course',
      resourceId: 1234,
      accountId: 4321
    });
  </script>
  <a id="tb_link" target="_blank" href="http://teachbase.ru?utm_source=widget">
    Работает на платформе Teachbase
  </a>
</div>
```
