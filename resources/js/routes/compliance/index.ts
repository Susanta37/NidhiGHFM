import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::index
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:12
 * @route '/super-admin/compliance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/super-admin/compliance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::index
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:12
 * @route '/super-admin/compliance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::index
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:12
 * @route '/super-admin/compliance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::index
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:12
 * @route '/super-admin/compliance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::index
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:12
 * @route '/super-admin/compliance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::index
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:12
 * @route '/super-admin/compliance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::index
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:12
 * @route '/super-admin/compliance'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::store
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:48
 * @route '/super-admin/compliance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/super-admin/compliance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::store
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:48
 * @route '/super-admin/compliance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::store
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:48
 * @route '/super-admin/compliance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::store
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:48
 * @route '/super-admin/compliance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::store
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:48
 * @route '/super-admin/compliance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::update
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}'
 */
export const update = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/super-admin/compliance/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::update
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}'
 */
update.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return update.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::update
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}'
 */
update.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::update
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}'
 */
    const updateForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::update
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}'
 */
        updateForm.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::deleteMethod
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:65
 * @route '/super-admin/compliance/{record}'
 */
export const deleteMethod = (args: { record: number | { id: number } } | [record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/super-admin/compliance/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::deleteMethod
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:65
 * @route '/super-admin/compliance/{record}'
 */
deleteMethod.url = (args: { record: number | { id: number } } | [record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: typeof args.record === 'object'
                ? args.record.id
                : args.record,
                }

    return deleteMethod.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::deleteMethod
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:65
 * @route '/super-admin/compliance/{record}'
 */
deleteMethod.delete = (args: { record: number | { id: number } } | [record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::deleteMethod
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:65
 * @route '/super-admin/compliance/{record}'
 */
    const deleteMethodForm = (args: { record: number | { id: number } } | [record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::deleteMethod
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:65
 * @route '/super-admin/compliance/{record}'
 */
        deleteMethodForm.delete = (args: { record: number | { id: number } } | [record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::verify
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}/verify'
 */
export const verify = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/super-admin/compliance/{record}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::verify
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}/verify'
 */
verify.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return verify.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::verify
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}/verify'
 */
verify.post = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::verify
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}/verify'
 */
    const verifyForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ComplianceController::verify
 * @see app/Http/Controllers/SuperAdmin/ComplianceController.php:0
 * @route '/super-admin/compliance/{record}/verify'
 */
        verifyForm.post = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(args, options),
            method: 'post',
        })
    
    verify.form = verifyForm
const compliance = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
delete: Object.assign(deleteMethod, deleteMethod),
verify: Object.assign(verify, verify),
}

export default compliance