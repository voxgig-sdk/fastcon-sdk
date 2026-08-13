# Fastcon SDK utility: make_context

from projectname_sdk.core.context import FastconContext


def make_context_util(ctxmap, basectx):
    return FastconContext(ctxmap, basectx)
