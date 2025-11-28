import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::superadmin
 * @see app/Http/Controllers/DashboardController.php:9
 * @route '/super-admin/dashboard'
 */
export const superadmin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: superadmin.url(options),
    method: 'get',
})

superadmin.definition = {
    methods: ["get","head"],
    url: '/super-admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::superadmin
 * @see app/Http/Controllers/DashboardController.php:9
 * @route '/super-admin/dashboard'
 */
superadmin.url = (options?: RouteQueryOptions) => {
    return superadmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::superadmin
 * @see app/Http/Controllers/DashboardController.php:9
 * @route '/super-admin/dashboard'
 */
superadmin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: superadmin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::superadmin
 * @see app/Http/Controllers/DashboardController.php:9
 * @route '/super-admin/dashboard'
 */
superadmin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: superadmin.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::superadmin
 * @see app/Http/Controllers/DashboardController.php:9
 * @route '/super-admin/dashboard'
 */
    const superadminForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: superadmin.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::superadmin
 * @see app/Http/Controllers/DashboardController.php:9
 * @route '/super-admin/dashboard'
 */
        superadminForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: superadmin.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::superadmin
 * @see app/Http/Controllers/DashboardController.php:9
 * @route '/super-admin/dashboard'
 */
        superadminForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: superadmin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    superadmin.form = superadminForm
/**
* @see \App\Http\Controllers\DashboardController::supervisor
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/supervisor/dashboard'
 */
export const supervisor = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: supervisor.url(options),
    method: 'get',
})

supervisor.definition = {
    methods: ["get","head"],
    url: '/supervisor/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::supervisor
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/supervisor/dashboard'
 */
supervisor.url = (options?: RouteQueryOptions) => {
    return supervisor.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::supervisor
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/supervisor/dashboard'
 */
supervisor.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: supervisor.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::supervisor
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/supervisor/dashboard'
 */
supervisor.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: supervisor.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::supervisor
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/supervisor/dashboard'
 */
    const supervisorForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: supervisor.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::supervisor
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/supervisor/dashboard'
 */
        supervisorForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: supervisor.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::supervisor
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/supervisor/dashboard'
 */
        supervisorForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: supervisor.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    supervisor.form = supervisorForm
/**
* @see \App\Http\Controllers\DashboardController::hr
 * @see app/Http/Controllers/DashboardController.php:19
 * @route '/hr/dashboard'
 */
export const hr = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hr.url(options),
    method: 'get',
})

hr.definition = {
    methods: ["get","head"],
    url: '/hr/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::hr
 * @see app/Http/Controllers/DashboardController.php:19
 * @route '/hr/dashboard'
 */
hr.url = (options?: RouteQueryOptions) => {
    return hr.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::hr
 * @see app/Http/Controllers/DashboardController.php:19
 * @route '/hr/dashboard'
 */
hr.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hr.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::hr
 * @see app/Http/Controllers/DashboardController.php:19
 * @route '/hr/dashboard'
 */
hr.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: hr.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::hr
 * @see app/Http/Controllers/DashboardController.php:19
 * @route '/hr/dashboard'
 */
    const hrForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: hr.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::hr
 * @see app/Http/Controllers/DashboardController.php:19
 * @route '/hr/dashboard'
 */
        hrForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: hr.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::hr
 * @see app/Http/Controllers/DashboardController.php:19
 * @route '/hr/dashboard'
 */
        hrForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: hr.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    hr.form = hrForm
/**
* @see \App\Http\Controllers\DashboardController::sitemanager
 * @see app/Http/Controllers/DashboardController.php:24
 * @route '/sitemanager/dashboard'
 */
export const sitemanager = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemanager.url(options),
    method: 'get',
})

sitemanager.definition = {
    methods: ["get","head"],
    url: '/sitemanager/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::sitemanager
 * @see app/Http/Controllers/DashboardController.php:24
 * @route '/sitemanager/dashboard'
 */
sitemanager.url = (options?: RouteQueryOptions) => {
    return sitemanager.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::sitemanager
 * @see app/Http/Controllers/DashboardController.php:24
 * @route '/sitemanager/dashboard'
 */
sitemanager.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemanager.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::sitemanager
 * @see app/Http/Controllers/DashboardController.php:24
 * @route '/sitemanager/dashboard'
 */
sitemanager.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sitemanager.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::sitemanager
 * @see app/Http/Controllers/DashboardController.php:24
 * @route '/sitemanager/dashboard'
 */
    const sitemanagerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sitemanager.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::sitemanager
 * @see app/Http/Controllers/DashboardController.php:24
 * @route '/sitemanager/dashboard'
 */
        sitemanagerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sitemanager.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::sitemanager
 * @see app/Http/Controllers/DashboardController.php:24
 * @route '/sitemanager/dashboard'
 */
        sitemanagerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sitemanager.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sitemanager.form = sitemanagerForm
/**
* @see \App\Http\Controllers\DashboardController::accountant
 * @see app/Http/Controllers/DashboardController.php:29
 * @route '/accountant/dashboard'
 */
export const accountant = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accountant.url(options),
    method: 'get',
})

accountant.definition = {
    methods: ["get","head"],
    url: '/accountant/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::accountant
 * @see app/Http/Controllers/DashboardController.php:29
 * @route '/accountant/dashboard'
 */
accountant.url = (options?: RouteQueryOptions) => {
    return accountant.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::accountant
 * @see app/Http/Controllers/DashboardController.php:29
 * @route '/accountant/dashboard'
 */
accountant.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accountant.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::accountant
 * @see app/Http/Controllers/DashboardController.php:29
 * @route '/accountant/dashboard'
 */
accountant.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: accountant.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::accountant
 * @see app/Http/Controllers/DashboardController.php:29
 * @route '/accountant/dashboard'
 */
    const accountantForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: accountant.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::accountant
 * @see app/Http/Controllers/DashboardController.php:29
 * @route '/accountant/dashboard'
 */
        accountantForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accountant.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::accountant
 * @see app/Http/Controllers/DashboardController.php:29
 * @route '/accountant/dashboard'
 */
        accountantForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accountant.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    accountant.form = accountantForm
/**
* @see \App\Http\Controllers\DashboardController::fieldstaff
 * @see app/Http/Controllers/DashboardController.php:34
 * @route '/fieldstaff/dashboard'
 */
export const fieldstaff = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fieldstaff.url(options),
    method: 'get',
})

fieldstaff.definition = {
    methods: ["get","head"],
    url: '/fieldstaff/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::fieldstaff
 * @see app/Http/Controllers/DashboardController.php:34
 * @route '/fieldstaff/dashboard'
 */
fieldstaff.url = (options?: RouteQueryOptions) => {
    return fieldstaff.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::fieldstaff
 * @see app/Http/Controllers/DashboardController.php:34
 * @route '/fieldstaff/dashboard'
 */
fieldstaff.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fieldstaff.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::fieldstaff
 * @see app/Http/Controllers/DashboardController.php:34
 * @route '/fieldstaff/dashboard'
 */
fieldstaff.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fieldstaff.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::fieldstaff
 * @see app/Http/Controllers/DashboardController.php:34
 * @route '/fieldstaff/dashboard'
 */
    const fieldstaffForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fieldstaff.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::fieldstaff
 * @see app/Http/Controllers/DashboardController.php:34
 * @route '/fieldstaff/dashboard'
 */
        fieldstaffForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fieldstaff.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::fieldstaff
 * @see app/Http/Controllers/DashboardController.php:34
 * @route '/fieldstaff/dashboard'
 */
        fieldstaffForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fieldstaff.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    fieldstaff.form = fieldstaffForm
const dashboard = {
    superadmin: Object.assign(superadmin, superadmin),
supervisor: Object.assign(supervisor, supervisor),
hr: Object.assign(hr, hr),
sitemanager: Object.assign(sitemanager, sitemanager),
accountant: Object.assign(accountant, accountant),
fieldstaff: Object.assign(fieldstaff, fieldstaff),
}

export default dashboard