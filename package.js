Package.describe({
  summary: "Trix for development environment"
});

Package.on_use(function (api) {
  api.use('underscore', ['client', 'server']);
  api.add_files('common.js', ['client', 'server']);
});
