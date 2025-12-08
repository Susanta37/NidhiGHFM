import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import settings69f00b from './settings'
/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::records
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:17
 * @route '/hr/face/records'
 */
export const records = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: records.url(options),
    method: 'get',
})

records.definition = {
    methods: ["get","head"],
    url: '/hr/face/records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::records
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:17
 * @route '/hr/face/records'
 */
records.url = (options?: RouteQueryOptions) => {
    return records.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::records
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:17
 * @route '/hr/face/records'
 */
records.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: records.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::records
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:17
 * @route '/hr/face/records'
 */
records.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: records.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::records
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:17
 * @route '/hr/face/records'
 */
    const recordsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: records.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::records
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:17
 * @route '/hr/face/records'
 */
        recordsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: records.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::records
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:17
 * @route '/hr/face/records'
 */
        recordsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: records.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    records.form = recordsForm
/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::logs
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:61
 * @route '/hr/face/logs'
 */
export const logs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})

logs.definition = {
    methods: ["get","head"],
    url: '/hr/face/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::logs
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:61
 * @route '/hr/face/logs'
 */
logs.url = (options?: RouteQueryOptions) => {
    return logs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::logs
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:61
 * @route '/hr/face/logs'
 */
logs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::logs
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:61
 * @route '/hr/face/logs'
 */
logs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::logs
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:61
 * @route '/hr/face/logs'
 */
    const logsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: logs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::logs
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:61
 * @route '/hr/face/logs'
 */
        logsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: logs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::logs
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:61
 * @route '/hr/face/logs'
 */
        logsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: logs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    logs.form = logsForm
/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::settings
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:74
 * @route '/hr/face/settings'
 */
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/hr/face/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::settings
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:74
 * @route '/hr/face/settings'
 */
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::settings
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:74
 * @route '/hr/face/settings'
 */
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::settings
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:74
 * @route '/hr/face/settings'
 */
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::settings
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:74
 * @route '/hr/face/settings'
 */
    const settingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: settings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::settings
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:74
 * @route '/hr/face/settings'
 */
        settingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\HRFaceRecognitionController::settings
 * @see app/Http/Controllers/HR/HRFaceRecognitionController.php:74
 * @route '/hr/face/settings'
 */
        settingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    settings.form = settingsForm
const face = {
    records: Object.assign(records, records),
logs: Object.assign(logs, logs),
settings: Object.assign(settings, settings69f00b),
}

export default face