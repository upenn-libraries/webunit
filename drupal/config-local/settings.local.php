<?php

// phpcs:ignoreFile

/**
 * @file
 * Local development override configuration feature.
 *
 * To activate this feature, copy and rename it such that its path plus
 * filename is 'sites/default/settings.local.php'. Then, go to the bottom of
 * 'sites/default/settings.php' and uncomment the commented lines that mention
 * 'settings.local.php'.
 *
 * If you are using a site name in the path, such as 'sites/example.com', copy
 * this file to 'sites/example.com/settings.local.php', and uncomment the lines
 * at the bottom of 'sites/example.com/settings.php'.
 */

/**
 * Assertions.
 *
 * The Drupal project primarily uses runtime assertions to enforce the
 * expectations of the API by failing when incorrect calls are made by code
 * under development.
 *
 * @see http://php.net/assert
 * @see https://www.drupal.org/node/2492225
 *
 * If you are using PHP 7.0 it is strongly recommended that you set
 * zend.assertions=1 in the PHP.ini file (It cannot be changed from .htaccess
 * or runtime) on development machines and to 0 in production.
 *
 * @see https://wiki.php.net/rfc/expectations
 */
assert_options(ASSERT_ACTIVE, TRUE);
\Drupal\Component\Assertion\Handle::register();

/**
 * Enable local development services.
 */
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

/**
 * Show all error messages, with backtrace information.
 *
 * In case the error level could not be fetched from the database, as for
 * example the database connection failed, we rely only on this value.
 */
$config['system.logging']['error_level'] = 'verbose';

/**
 * Disable CSS and JS aggregation.
 */
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

/**
 * Disable the render cache.
 *
 * Note: you should test with the render cache enabled, to ensure the correct
 * cacheability metadata is present. However, in the early stages of
 * development, you may want to disable it.
 *
 * This setting disables the render cache by using the Null cache back-end
 * defined by the development.services.yml file above.
 *
 * Only use this setting once the site has been installed.
 */
# $settings['cache']['bins']['render'] = 'cache.backend.null';

/**
 * Disable caching for migrations.
 *
 * Uncomment the code below to only store migrations in memory and not in the
 * database. This makes it easier to develop custom migrations.
 */
# $settings['cache']['bins']['discovery_migration'] = 'cache.backend.memory';

/**
 * Disable Internal Page Cache.
 *
 * Note: you should test with Internal Page Cache enabled, to ensure the correct
 * cacheability metadata is present. However, in the early stages of
 * development, you may want to disable it.
 *
 * This setting disables the page cache by using the Null cache back-end
 * defined by the development.services.yml file above.
 *
 * Only use this setting once the site has been installed.
 */
$settings['cache']['bins']['page'] = 'cache.backend.null';

/**
 * Disable Dynamic Page Cache.
 *
 * Note: you should test with Dynamic Page Cache enabled, to ensure the correct
 * cacheability metadata is present (and hence the expected behavior). However,
 * in the early stages of development, you may want to disable it.
 */
# $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

/**
 * Allow test modules and themes to be installed.
 *
 * Drupal ignores test modules and themes by default for performance reasons.
 * During development it can be useful to install test extensions for debugging
 * purposes.
 */
# $settings['extension_discovery_scan_tests'] = TRUE;

/**
 * Enable access to rebuild.php.
 *
 * This setting can be enabled to allow Drupal's php and database cached
 * storage to be cleared via the rebuild.php page. Access to this page can also
 * be gained by generating a query string from rebuild_token_calculator.sh and
 * using these parameters in a request to rebuild.php.
 */
$settings['rebuild_access'] = TRUE;

/**
 * Skip file system permissions hardening.
 *
 * The system module will periodically check the permissions of your site's
 * site directory to ensure that it is not writable by the website user. For
 * sites that are managed with a version control system, this can cause problems
 * when files in that directory such as settings.php are updated, because the
 * user pulling in the changes won't have permissions to modify files in the
 * directory.
 */
$settings['skip_permissions_hardening'] = TRUE;

/**
 * Exclude modules from configuration synchronization.
 *
 * On config export sync, no config or dependent config of any excluded module
 * is exported. On config import sync, any config of any installed excluded
 * module is ignored. In the exported configuration, it will be as if the
 * excluded module had never been installed. When syncing configuration, if an
 * excluded module is already installed, it will not be uninstalled by the
 * configuration synchronization, and dependent configuration will remain
 * intact. This affects only configuration synchronization; single import and
 * export of configuration are not affected.
 *
 * Drupal does not validate or sanity check the list of excluded modules. For
 * instance, it is your own responsibility to never exclude required modules,
 * because it would mean that the exported configuration can not be imported
 * anymore.
 *
 * This is an advanced feature and using it means opting out of some of the
 * guarantees the configuration synchronization provides. It is not recommended
 * to use this feature with modules that affect Drupal in a major way such as
 * the language or field module.
 */
# $settings['config_exclude_modules'] = ['devel', 'stage_file_proxy'];

/**
 * Set Config Split environment(s).
 */
// $config['config_split.config_split.development']['status'] = TRUE;
// $config['config_split.config_split.production']['status'] = TRUE;

/**
 * Enable local development service parameters to disable caching and turn on
 * debugging for Twig.
 */
// $settings['container_yamls'][] = DRUPAL_ROOT . '/sites/twig_development.services.yml';

/**
 * Override node IDs for front and 403 pages, if necessary.
 */
// $config['system.site']['page']['front'] = '/node/#';
// $config['system.site']['page']['403'] = '/node/#';

$lando_info = getenv('LANDO_INFO');
if (!$lando_info) {
  return;
}
$lando = json_decode($lando_info, TRUE);

/**
 * Configure database for local.
 **/

// PennLib
if ($_SERVER['LANDO'] === 'ON') {
  // lando-friendly setup
  // https://github.com/lando/lando/issues/585
  $databases['default']['default'] = [
    'database' => $lando['database']['creds']['database'],
    'username' => $lando['database']['creds']['user'],
    'password' => $lando['database']['creds']['password'],
    'prefix' => '',
    'host' => $lando['database']['internal_connection']['host'],
    'port' => $lando['database']['internal_connection']['port'],
    'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
    'driver' => 'mysql',
  ];
}
// WDG
else {
  $databases['default']['default'] = [
    'database' => 'drupal',
    'username' => 'mysql',
    'password' => 'mysql',
    'host' => 'mariadb',
    'port' => '3306',
    'driver' => 'mysql',
    'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
    'prefix' => '',
  ];
}

/**
 * Redis.
 */
$settings['redis.connection']['host'] = $lando['cache']['internal_connection']['host'];
$settings['redis.connection']['port'] = $lando['cache']['internal_connection']['port'];

/**
 * Enable local config split
 */
$config['config_split.config_split.local']['status'] = TRUE;

/**
 * Trust localhost domain only.
 */
$settings['trusted_host_patterns'] = [
  '^localhost$',
  '^127\.0\.0\.1$',
  '\.local$',
];
