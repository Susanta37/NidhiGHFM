import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:55
 * @route '/super-admin/shifts/assignments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/super-admin/shifts/assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:55
 * @route '/super-admin/shifts/assignments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:55
 * @route '/super-admin/shifts/assignments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:55
 * @route '/super-admin/shifts/assignments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:55
 * @route '/super-admin/shifts/assignments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:84
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
export const update = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/super-admin/shifts/assignments/{assignment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:84
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
update.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:84
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
update.put = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:84
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
    const updateForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:84
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
        updateForm.put = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:114
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
export const destroy = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/super-admin/shifts/assignments/{assignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:114
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
destroy.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return destroy.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:114
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
destroy.delete = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:114
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
    const destroyForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:114
 * @route '/super-admin/shifts/assignments/{assignment}'
 */
        destroyForm.delete = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const assignments = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default assignments