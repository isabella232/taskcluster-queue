module.exports = {
  // TaskCluster Queue configuration
  queue: {
    // Publish references and schemas
    publishMetaData:              'false',

    // Prefix for exchanges declared
    exchangePrefix:               'v1/',

    // Settings for task reaper, note that this must be started as a separate
    // process bin/reaper.js run the reaper
    reaper: {
      // Timeout between dealing with timed tasks
      interval:                   180,

      // Number of times reaping is allowed to fail in a row, before the process
      // crashes as sign if illness
      errorLimit:                 5
    },

    // Number of seconds before the claim to a run expires
    claimTimeout:                 20 * 60,

    // S3 bucket where artifacts are stored
    artifactBucket:               'taskcluster-artifacts',

    // Azure blob container for artifacts
    artifactContainer:            'artifacts',

    // Azure task storage container (for task information and archived status)
    taskContainer:                'tasks',

    // Azure table name for artifacts meta-data
    artifactTableName:            'Artifacts',

    // Number of hours to wait extra before expiring artifacts
    // This is instead of expiring artifacts that have expiry set to just now.
    artifactExpirationDelay:      '1',

    // Component property in the responseTime and process statistics
    statsComponent:               'queue',

    // Prefix for azure queues (at most 6 characters)
    queuePrefix:                  'queue',

    // Secret to be used for signing messages that we put in azure queue,
    // this protects us from workers trying to claim task they didn't get.
    signatureSecret:              'public secret'
  },

  // TaskCluster configuration
  taskcluster: {
    // BaseUrl for auth, if default built-in baseUrl isn't to be provided
    authBaseUrl:                  undefined,

    // TaskCluster credentials for this server, these must have scopes:
    // auth:credentials
    // (typically configured using environment variables)
    credentials: {
      clientId:                   undefined,
      accessToken:                undefined
    }
  },

  // Server configuration
  server: {
    // Public URL from which the server can be accessed (used for persona)
    publicUrl:                      'http://queue.taskcluster.net',

    // Port to listen for requests on
    port:                           undefined,

    // Environment 'development' or 'production'
    env:                            'development',

    // Force SSL, not useful when runnning locally
    forceSSL:                       false,

    // Trust a forwarding proxy
    trustProxy:                     false,
  },

  // Database configuration
  database: {
    // Database connection string as pg://user:password@host:port/database
    // This setting can be overwritten by DATABASE_URL if defined.
    connectionString:               undefined
  },

  // Azure credentials configuration
  azure: {
    accountName:                    undefined,
    accountKey:                     undefined
  },

  // Pulse credentials
  pulse: {
    username:                       undefined,
    password:                       undefined
  },

  // InfluxDB configuration
  influx: {
    // Usually provided as environment variables, must be on the form:
    // https://<user>:<pwd>@<host>:<port>/db/<database>
    connectionString:               undefined,

    // Maximum delay before submitting pending points
    maxDelay:                       5 * 60,

    // Maximum pending points in memory
    maxPendingPoints:               250
  },

  // AWS SDK configuration for publication of schemas and references
  aws: {
    // Access key id (typically configured using environment variables)
    accessKeyId:                    undefined,

    // Secret access key (typically configured using environment variables)
    secretAccessKey:                undefined,

    // Default AWS region, this is where the S3 bucket lives
    region:                         'us-west-2',

    // Lock API version to use the latest API from 2013, this is fuzzy locking,
    // but it does the trick...
    apiVersion:                     '2014-01-01'
  }
};
