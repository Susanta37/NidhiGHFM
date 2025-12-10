import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import assignmentsA4dcb6 from './assignments'
import swaps7ed2d6 from './swaps'
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::index
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:14
 * @route '/super-admin/shifts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/super-admin/shifts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::index
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:14
 * @route '/super-admin/shifts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::index
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:14
 * @route '/super-admin/shifts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::index
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:14
 * @route '/super-admin/shifts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::index
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:14
 * @route '/super-admin/shifts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::index
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:14
 * @route '/super-admin/shifts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::index
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:14
 * @route '/super-admin/shifts'
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
* @see \App\Http\Controllers\SuperAdmin\ShiftController::create
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/super-admin/shifts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::create
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::create
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::create
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::create
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::create
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::create
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:45
 * @route '/super-admin/shifts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/super-admin/shifts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:45
 * @route '/super-admin/shifts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:45
 * @route '/super-admin/shifts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:45
 * @route '/super-admin/shifts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::store
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:45
 * @route '/super-admin/shifts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::edit
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/{shift}/edit'
 */
export const edit = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/super-admin/shifts/{shift}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::edit
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/{shift}/edit'
 */
edit.url = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    shift: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shift: args.shift,
                }

    return edit.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::edit
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/{shift}/edit'
 */
edit.get = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::edit
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/{shift}/edit'
 */
edit.head = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::edit
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/{shift}/edit'
 */
    const editForm = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::edit
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/{shift}/edit'
 */
        editForm.get = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::edit
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:0
 * @route '/super-admin/shifts/{shift}/edit'
 */
        editForm.head = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:64
 * @route '/super-admin/shifts/{shift}'
 */
export const update = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/super-admin/shifts/{shift}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:64
 * @route '/super-admin/shifts/{shift}'
 */
update.url = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shift: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shift: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shift: typeof args.shift === 'object'
                ? args.shift.id
                : args.shift,
                }

    return update.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:64
 * @route '/super-admin/shifts/{shift}'
 */
update.put = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:64
 * @route '/super-admin/shifts/{shift}'
 */
update.patch = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:64
 * @route '/super-admin/shifts/{shift}'
 */
    const updateForm = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:64
 * @route '/super-admin/shifts/{shift}'
 */
        updateForm.put = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::update
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:64
 * @route '/super-admin/shifts/{shift}'
 */
        updateForm.patch = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:82
 * @route '/super-admin/shifts/{shift}'
 */
export const destroy = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/super-admin/shifts/{shift}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:82
 * @route '/super-admin/shifts/{shift}'
 */
destroy.url = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shift: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shift: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shift: typeof args.shift === 'object'
                ? args.shift.id
                : args.shift,
                }

    return destroy.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:82
 * @route '/super-admin/shifts/{shift}'
 */
destroy.delete = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:82
 * @route '/super-admin/shifts/{shift}'
 */
    const destroyForm = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftController::destroy
 * @see app/Http/Controllers/SuperAdmin/ShiftController.php:82
 * @route '/super-admin/shifts/{shift}'
 */
        destroyForm.delete = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::assignments
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:14
 * @route '/super-admin/shifts/assignments'
 */
export const assignments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assignments.url(options),
    method: 'get',
})

assignments.definition = {
    methods: ["get","head"],
    url: '/super-admin/shifts/assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::assignments
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:14
 * @route '/super-admin/shifts/assignments'
 */
assignments.url = (options?: RouteQueryOptions) => {
    return assignments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::assignments
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:14
 * @route '/super-admin/shifts/assignments'
 */
assignments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assignments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::assignments
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:14
 * @route '/super-admin/shifts/assignments'
 */
assignments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assignments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::assignments
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:14
 * @route '/super-admin/shifts/assignments'
 */
    const assignmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assignments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::assignments
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:14
 * @route '/super-admin/shifts/assignments'
 */
        assignmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assignments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftAssignmentController::assignments
 * @see app/Http/Controllers/SuperAdmin/ShiftAssignmentController.php:14
 * @route '/super-admin/shifts/assignments'
 */
        assignmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assignments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assignments.form = assignmentsForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::swaps
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:15
 * @route '/super-admin/shifts/swaps'
 */
export const swaps = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: swaps.url(options),
    method: 'get',
})

swaps.definition = {
    methods: ["get","head"],
    url: '/super-admin/shifts/swaps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::swaps
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:15
 * @route '/super-admin/shifts/swaps'
 */
swaps.url = (options?: RouteQueryOptions) => {
    return swaps.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::swaps
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:15
 * @route '/super-admin/shifts/swaps'
 */
swaps.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: swaps.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::swaps
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:15
 * @route '/super-admin/shifts/swaps'
 */
swaps.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: swaps.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::swaps
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:15
 * @route '/super-admin/shifts/swaps'
 */
    const swapsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: swaps.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::swaps
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:15
 * @route '/super-admin/shifts/swaps'
 */
        swapsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: swaps.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::swaps
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:15
 * @route '/super-admin/shifts/swaps'
 */
        swapsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: swaps.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    swaps.form = swapsForm
const shifts = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
assignments: Object.assign(assignments, assignmentsA4dcb6),
swaps: Object.assign(swaps, swaps7ed2d6),
}

export default shifts