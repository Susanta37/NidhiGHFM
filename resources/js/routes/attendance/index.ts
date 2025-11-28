import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\AttendanceController::daily
 * @see app/Http/Controllers/SuperAdmin/AttendanceController.php:13
 * @route '/super-admin/attendance/daily'
 */
export const daily = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: daily.url(options),
    method: 'get',
})

daily.definition = {
    methods: ["get","head"],
    url: '/super-admin/attendance/daily',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\AttendanceController::daily
 * @see app/Http/Controllers/SuperAdmin/AttendanceController.php:13
 * @route '/super-admin/attendance/daily'
 */
daily.url = (options?: RouteQueryOptions) => {
    return daily.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\AttendanceController::daily
 * @see app/Http/Controllers/SuperAdmin/AttendanceController.php:13
 * @route '/super-admin/attendance/daily'
 */
daily.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: daily.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\AttendanceController::daily
 * @see app/Http/Controllers/SuperAdmin/AttendanceController.php:13
 * @route '/super-admin/attendance/daily'
 */
daily.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: daily.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\AttendanceController::daily
 * @see app/Http/Controllers/SuperAdmin/AttendanceController.php:13
 * @route '/super-admin/attendance/daily'
 */
    const dailyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: daily.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\AttendanceController::daily
 * @see app/Http/Controllers/SuperAdmin/AttendanceController.php:13
 * @route '/super-admin/attendance/daily'
 */
        dailyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: daily.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\AttendanceController::daily
 * @see app/Http/Controllers/SuperAdmin/AttendanceController.php:13
 * @route '/super-admin/attendance/daily'
 */
        dailyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: daily.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    daily.form = dailyForm
const attendance = {
    daily: Object.assign(daily, daily),
}

export default attendance