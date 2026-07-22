# Fastcon SDK utility: make_context

from core.context import FastconContext


def make_context_util(ctxmap, basectx):
    return FastconContext(ctxmap, basectx)
