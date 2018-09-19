import { Dept } from '@shared/sys/sys.entity';
import { NzTreeNode } from 'ng-zorro-antd';
export class DeptUtils {
  static Noddes(depts: Array<Dept>) {
    const list: Array<NzTreeNode> = [];
    for ( const dept of depts) {
      dept.parentDept = new Dept();
      const node = new NzTreeNode (
        { title : dept.name ,
          key : dept.id || dept.id,
          isLeaf: !dept.hasChildren,
          origin: dept
        }
      );
      list.push(node);
    }
    return list;
  }
  static getNodes(node: NzTreeNode, depts: Array<Dept>) {
    for ( const dept of depts) {
      if  (node.title === dept.name && node.key === dept.id ) {
        return dept;
      }
    }
  }
}
