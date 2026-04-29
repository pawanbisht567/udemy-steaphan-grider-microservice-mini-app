Deployment, Replicaset, PODs, services all of them refer to as Objects in K8s.
All Objects that we create are made by first creating the config file and then applying that config file to our cluster

```
  kubectl apply -f <file-name?.yml
  kubectl get deployments
  kubectl get pods
  kubectl logs <pod-name>
```

We need to use the images from the docker-hub, so we need to push them to docker hub
docker build -t pawanbisht94/posts .
docker push pawanbisht94/posts


then

kubectl rollout restart deployment <deployment-name>


In service
port: 4000    means which PORT number runs on POD
targetPort: 4000   means which PORT number runs on the SERVICE

kubectl describe service posts-srv
Name:                     posts-srv
Namespace:                default
Labels:                   <none>
Annotations:              <none>
Selector:                 app=posts
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.96.73.212
IPs:                      10.96.73.212
Port:                     posts  4000/TCP
TargetPort:               4000/TCP
NodePort:                 posts  31842/TCP
Endpoints:                10.244.0.3:4000,10.244.0.7:4000
Session Affinity:         None
External Traffic Policy:  Cluster
Internal Traffic Policy:  Cluster
Events:                   <none>

For getting the response of the container from the browser we can use the 31842/TCP
but we generally use the below command

kubectl port-forward service/posts-srv 4000:4000